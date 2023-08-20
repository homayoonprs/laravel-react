<?php

namespace App\Http\Resources\Coupon;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'code' => $this->code,
            'public' => $this->public,
            'is_active' => $this->is_active,
            'amount' => $this->amount,
            'minimum_purchase' => $this->minimum_purchase,
            'max_discount' => $this->max_discount,
            'max_usage' => $this->max_usage,
            'users' => $this->users()->get(),
            'invoices' => $this->invoices()->get(),
            'starts_at' => jdate($this->starts_at)->format('Y-m-d H:i'),
            'expire_at' => jdate($this->expire_at)->format('Y-m-d H:i'),
            'updated_at' => jdate($this->updated_at)->format('Y-m-d H:i'),
            'created_at' => jdate($this->created_at)->format('Y-m-d H:i'),
        ];
    }

    public function with($request)
    {
        return [
            'operation_id' => InternalOperation::getOperationId()
        ];
    }
}
