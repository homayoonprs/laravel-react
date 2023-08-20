<?php

namespace App\Http\Controllers\API\Client;

use App\Actions\Invoice\CalculateInvoiceAmountsAction;
use App\DTOs\AccountModelDTO;
use App\DTOs\TransactionModelDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\InvoiceRequest;
use App\Http\Resources\Invoice\InvoiceCollection;
use App\Http\Resources\Invoice\InvoiceResource;
use App\Models\Account;
use App\Models\Plan;
use App\Models\Transaction;
use App\Repositories\Eloquent\EloquentAccountRepository;
use App\Repositories\Eloquent\EloquentInvoiceRepository;
use App\Repositories\Eloquent\EloquentTransactionRepository;
use App\Support\ResponseHelper;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function __construct(
        private EloquentInvoiceRepository $invoiceRepository,
        private EloquentAccountRepository $accountrepository,
        private EloquentTransactionRepository $transactionrepository,
        private CalculateInvoiceAmountsAction $calculateInvoiceAmountsAction
    )
    {}

    public function index()
    {
        return new InvoiceCollection($this->invoiceRepository->getUserInvoices(auth()->user()));
    }

    public function getOpeninvoice()
    {
        $invoice = $this->invoiceRepository->getOrCreateUserOpenInvoice(auth()->user());
        return $invoice 
            ? new InvoiceResource($invoice)
            : ResponseHelper::getSuccessResponse($invoice) ;
    }

    public function addPlanToInvoice(Plan $plan, InvoiceRequest $request)
    {
        $invoice = $this->invoiceRepository->getOrCreateUserOpenInvoice(auth()->user());
        $userID = auth()->user()->id;
        
        $transactionData = (object) [
            'amount' => $plan->price,
            'invoice_id' => $invoice->id,
            'user_id' => $userID,
            'plan_id' => $plan->id,
        ];
        $transactionDTO = TransactionModelDTO::fromObject($transactionData);

        $accountData = (object) [
            'username' => Account::generateUsername($plan->random_username_prefix, $userID),
            'password' => rand(10000, 99999),
            'user_id' => $userID,
            'plan_id' => $plan->id,
        ];
        $accountDTO = AccountModelDTO::fromObject($accountData);

        $count = $request->count <= 0 ? 1 : $request->count;

        for ($i = 0; $i < $count; $i++){
            $transaction = $this->transactionrepository->store($transactionDTO);
            $account = $this->accountrepository->store($accountDTO);
            $this->accountrepository->attachTransaction($account, $transaction);
            $this->transactionrepository->attachAccount($transaction, $account);
        }
        $this->calculateInvoiceAmountsAction->handle($invoice);
        return new InvoiceResource($invoice);
    }

    public function removePlanFromInvoice(Plan $plan, InvoiceRequest $request)
    {
        $removeOnlyOne = $request->has('remove_only_one') ? $request->remove_only_one : '0';
        $invoice = $this->invoiceRepository->getOrCreateUserOpenInvoice(auth()->user());
        $deletedCount = 0;
        foreach($invoice->transactions()->with('account')->get() as  $transaction){

            if($removeOnlyOne == '1' && $deletedCount >= 1){
                continue;
            }

            if($transaction->plan_id == $plan->id){
                $this->transactionrepository->destroy($transaction);
                $this->accountrepository->destroy($transaction->account);
                $deletedCount++;
            }
        }
        $this->calculateInvoiceAmountsAction->handle($invoice);
        return new InvoiceResource($invoice);        
    }
}
