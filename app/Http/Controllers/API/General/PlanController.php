<?php

namespace App\Http\Controllers\API\General;

use App\Actions\Coupon\HandleAttachCouponToInvoiceAction;
use App\Actions\Invoice\CalculateInvoiceAmountsAction;
use App\DTOs\AccountModelDTO;
use App\DTOs\TransactionModelDTO;
use App\Http\Controllers\Controller;
use App\Http\Resources\Invoice\InvoiceResource;
use App\Http\Resources\Plan\PlanCollection;
use App\Http\Resources\Plan\PlanResource;
use App\Models\Account;
use App\Models\Plan;
use App\Repositories\Eloquent\EloquentAccountRepository;
use App\Repositories\Eloquent\EloquentCouponRepository;
use App\Repositories\Eloquent\EloquentInvoiceRepository;
use App\Repositories\Eloquent\EloquentPlanRepository;
use App\Repositories\Eloquent\EloquentTransactionRepository;
use App\Repositories\Eloquent\EloquentUserRepository;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function __construct(
        private EloquentPlanRepository $planRepository,
        private EloquentInvoiceRepository $invoiceRepository,
        private EloquentAccountRepository $accountrepository,
        private EloquentTransactionRepository $transactionrepository,
        private EloquentUserRepository $userRepository,
        private CalculateInvoiceAmountsAction $calculateInvoiceAmountsAction,
        private EloquentCouponRepository $couponRepository,
        private HandleAttachCouponToInvoiceAction $handleAttachCouponToInvoiceAction,
    )
    {}

    public function index()
    {
        return new PlanCollection($this->planRepository->getActives());
    }

    public function show(Plan $plan)
    {
        return new PlanResource($this->planRepository->show($plan));
    }

    public function storeInvoice(Request $request)
    {
        $request->validate([
            'plans_id' => ['required','array'],
            'email' => ['required','email'],
            'password' => ['required'],
        ],[
            'plans_id.required' => 'لطفا پلن مد نظر را انتخاب کنید',
        ]);

        // find Or Create User
        $user = $this->userRepository->findOrCreateUser($request->email, $request->password);

        // get latest invoice
        $invoice = $this->invoiceRepository->getOrCreateUserOpenInvoice($user);

        // remove invoice old data
        foreach($invoice->transactions()->get() as $oldTransactions){
            $this->transactionrepository->destroy($oldTransactions);
            $this->accountrepository->destroy($oldTransactions->account);
        }

        foreach($request->plans_id as $planID){
            $plan = $this->planRepository->getByID($planID);
            $userID = $user->id;
            
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
    
            $transaction = $this->transactionrepository->store($transactionDTO);
            $account = $this->accountrepository->store($accountDTO);
            $this->accountrepository->attachTransaction($account, $transaction);
            $this->transactionrepository->attachAccount($transaction, $account);
        }

        if(isset($request->coupon_code)){
            $coupon = $this->couponRepository->finByCode($request->coupon_code);
            $this->handleAttachCouponToInvoiceAction->handle($coupon, $invoice);
        }

        $this->calculateInvoiceAmountsAction->handle($invoice);
        
        return new InvoiceResource($invoice);
    }
}
