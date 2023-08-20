<?php

namespace App\Http\Resources\Coupon;

use App\Support\InternalOperation;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CouponCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($coupon) {
            $remaining_days = Carbon::parse($coupon->expire_at)->diffInDays();
            return [
                'id' => $coupon->id,
                'title' => $coupon->title,
                'description' => $coupon->description,
                'code' => $coupon->code,
                'public' => $coupon->public,
                'is_active' => $coupon->is_active,
                'amount' => $coupon->amount,
                'minimum_purchase' => $coupon->minimum_purchase,
                'max_discount' => $coupon->max_discount,
                'max_usage' => $coupon->max_usage,
                'starts_at' => jdate($coupon->starts_at)->format('Y-m-d H:i'),
                'expire_at' => jdate($coupon->expire_at)->format('Y-m-d H:i'),
                'remaining_days' => $remaining_days,
                'updated_at' => jdate($coupon->updated_at)->format('Y-m-d H:i'),
                'created_at' => jdate($coupon->created_at)->format('Y-m-d H:i'),
            ];
        });
    }

    public function with($request)
    {
        return [
            'operation_id' => InternalOperation::getOperationId()
        ];
    }
}
