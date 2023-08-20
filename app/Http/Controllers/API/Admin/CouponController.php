<?php

namespace App\Http\Controllers\API\Admin;

use App\Actions\Coupon\HandleAttachCouponToInvoiceAction;
use App\Actions\Coupon\HandleDetachCouponFromInvoiceAction;
use App\Exceptions\CouponException;
use App\Http\Controllers\Controller;
use App\Http\Requests\CouponRequest;
use App\Http\Resources\Coupon\CouponCollection;
use App\Http\Resources\Coupon\CouponResource;
use App\Http\Resources\Invoice\InvoiceResource;
use App\Models\Coupon;
use App\Models\Invoice;
use App\Repositories\Eloquent\EloquentCouponRepository;

class CouponController extends Controller
{
    public function __construct(
        private EloquentCouponRepository $repository,
        private HandleAttachCouponToInvoiceAction $handleAttachCouponToInvoiceAction,
        private HandleDetachCouponFromInvoiceAction $handleDetachCouponFromInvoiceAction
    )
    {
        $this->authorizeResource(Coupon::class, 'coupon');
    }

    public function index()
    {
        return new CouponCollection($this->repository->paginatedWithFilter());
    }

    public function store(CouponRequest $request)
    {
        $dto = $request->toDTO();
        $coupon = $this->repository->store($dto);

        if(!$dto->public){
            $this->repository->syncUsers($coupon, $dto->users_id);
        }

        return new CouponResource($coupon);
    }

    public function show(Coupon $coupon)
    {
        return new CouponResource($this->repository->show($coupon));
    }

    public function update(CouponRequest $request, Coupon $coupon)
    {
        $dto = $request->toDTO();
        $this->repository->update($coupon, $dto);
        $this->repository->syncUsers($coupon, $dto->public ? [] : $dto->users_id);
        return new CouponResource($coupon);
    }

    public function attachCouponToInvoice(CouponRequest $request, Invoice $invoice)
    {
        $coupon = $this->repository->finByCode($request->coupon_code);
        $this->handleAttachCouponToInvoiceAction->handle($coupon, $invoice);
        return new InvoiceResource($invoice);
    }

    public function detachCouponFromInvoice(Invoice $invoice)
    {
        $this->handleDetachCouponFromInvoiceAction->handle($invoice);
        return new InvoiceResource($invoice);
    }

}
