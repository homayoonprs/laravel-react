<?php

namespace App\Http\Controllers\API\Admin;

use App\Actions\Account\HandleActivateAccountAction;
use App\Actions\Invoice\CalculateInvoiceAmountsAction;
use App\DTOs\AccountModelDTO;
use App\DTOs\InvoiceModelDTO;
use App\DTOs\TransactionModelDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\InvoiceRequest;
use App\Http\Resources\Invoice\InvoiceCollection;
use App\Http\Resources\Invoice\InvoiceResource;
use App\Models\Account;
use App\Models\Invoice;
use App\Models\Transaction;
use App\Repositories\Eloquent\EloquentAccountRepository;
use App\Repositories\Eloquent\EloquentInvoiceRepository;
use App\Repositories\Eloquent\EloquentTransactionRepository;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function __construct(
        private EloquentInvoiceRepository $invoicerepository,
        private EloquentAccountRepository $accountrepository,
        private EloquentTransactionRepository $transactionrepository,
        private CalculateInvoiceAmountsAction $calculateInvoiceAmountsAction,
        private HandleActivateAccountAction $handleActivateAccountAction
    )
    {
        $this->authorizeResource(Invoice::class, 'invoice');
    }

    public function index()
    {
        return new InvoiceCollection($this->invoicerepository->paginatedWithFilter());
    }

    public function store(InvoiceRequest $request)
    {
        $requestData = $request->merge(['payment_at' => now()]);
        $dto = InvoiceModelDTO::fromObject($requestData);
        $invoice = $this->invoicerepository->store($dto);
        return new InvoiceResource($invoice);
    }

    public function update(InvoiceRequest $request, Invoice $invoice)
    {
        $this->invoicerepository->update($invoice,$request->toDTO());
        return new InvoiceResource($invoice);
    }

    public function show(Invoice $invoice)
    {
        return new InvoiceResource($this->invoicerepository->show($invoice));
    }

    public function createAccountAndTransactionForInvoice(InvoiceRequest $request)
    {
        $accountDTO = AccountModelDTO::fromRequest($request);
        $transactionDTO = TransactionModelDTO::fromObject($request);
        $account = $this->accountrepository->store($accountDTO);
        $transaction = $this->transactionrepository->store($transactionDTO);
        $this->accountrepository->attachTransaction($account, $transaction);
        $this->transactionrepository->attachAccount($transaction, $account);
        
        $this->handleActivateAccountAction->handle($account);
        
        return new InvoiceResource($transaction->invoice);
    }

    public function updateAccountAndTransactionOfInvoice(InvoiceRequest $request, Transaction $transaction, Account $account)
    {
        $accountDTO = AccountModelDTO::fromRequest($request);
        $transactionDTO = TransactionModelDTO::fromObject($request);
        $this->accountrepository->update($account, $accountDTO);
        $this->transactionrepository->update($transaction, $transactionDTO);

        return new InvoiceResource($transaction->invoice);
    }

    public function removeAccountAndTransactionFromInvoice(Transaction $transaction, Account $account){
        $this->transactionrepository->destroy($transaction);
        $this->accountrepository->destroy($account);
        return new InvoiceResource($transaction->invoice);
    }

    public function destroy(Invoice $invoice)
    {
        foreach($invoice->transactions()->get() as $transaction){
            $this->accountrepository->destroy($transaction->account);
            $this->transactionrepository->destroy($transaction);
        }
        $this->invoicerepository->destroy($invoice);
        return new InvoiceResource($invoice);
    }

}
