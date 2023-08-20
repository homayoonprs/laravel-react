<?php

namespace App\Http\Controllers\API\Client;

use App\Actions\Coupon\HandleAttachCouponToInvoiceAction;
use App\Actions\Coupon\HandleDetachCouponFromInvoiceAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\CouponRequest;
use App\Http\Resources\Coupon\CouponCollection;
use App\Http\Resources\Invoice\InvoiceResource;
use App\Models\Invoice;
use App\Repositories\Eloquent\EloquentCouponRepository;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function __construct(
        private EloquentCouponRepository $couponRepository,
        private HandleAttachCouponToInvoiceAction $handleAttachCouponToInvoiceAction,
        private HandleDetachCouponFromInvoiceAction $handleDetachCouponFromInvoiceAction
    )
    {}
    
    public function index()
    {
        return new CouponCollection($this->couponRepository->getPaginatedUserCoupons(auth()->user()));
    }

    public function attachCouponToInvoice(CouponRequest $request, Invoice $invoice)
    {
        $coupon = $this->couponRepository->finByCode($request->coupon_code);
        $this->handleAttachCouponToInvoiceAction->handle($coupon, $invoice);
        return new InvoiceResource($invoice);
    }

    public function detachCouponFromInvoice(Invoice $invoice)
    {
        $this->handleDetachCouponFromInvoiceAction->handle($invoice);
        return new InvoiceResource($invoice);
    }
}
