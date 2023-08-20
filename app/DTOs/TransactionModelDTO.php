<?php

namespace App\DTOs;

use App\DTOs\Contracts\BaseDTO;

class TransactionModelDTO extends BaseDTO
{

    public function __construct(
        public string $amount,
        public string $invoice_id,
        public string $user_id,
        public string $plan_id,
        public ?string $account_id,
    )
    {}

    public static function fromObject(object $data): static
    {
        return new static(
            amount: $data->amount,
            invoice_id: $data->invoice_id,
            user_id: $data->user_id,
            plan_id: $data->plan_id,
            account_id: isset($data->account_id) ? $data->account_id : null,
        );
    }

    public static function fromRequest(object $request): static
    {
        return new static(
            amount: $request->amount,
            invoice_id: $request->invoice_id,
            user_id: $request->user_id,
            plan_id: $request->plan_id,
            account_id: isset($request->account_id) ? $request->account_id : null,
        );
    }
}
