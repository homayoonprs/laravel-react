<?php

namespace App\DTOs;

use App\DTOs\Contracts\BaseDTO;

class InvoiceModelDTO extends BaseDTO
{

    public function __construct(
        public string  $user_id,
        public ?string  $total_amount,
        public ?string  $payable,
        public ?string  $discount,
        public ?string  $description,
        public ?string  $coupon_id,
        public ?string  $gateway_id,
        public ?string $payment_at = null,
    )
    {}

    public static function fromObject(object $data): static
    {
        return new static(
            user_id: $data->user_id,
            total_amount: $data->total_amount,
            payable: $data->payable,
            discount: $data->discount,
            description: $data->description,
            coupon_id: $data->coupon_id,
            gateway_id: $data->gateway_id,
            payment_at: $data->payment_at,
        );
    }

    public static function fromRequest(object $request): static
    {
        return new static(
            user_id: $request->user_id,
            total_amount: $request->total_amount,
            payable: $request->payable,
            discount: $request->discount,
            description: $request->description,
            coupon_id: $request->coupon_id,
            gateway_id: $request->gateway_id,
        );
    }
}
