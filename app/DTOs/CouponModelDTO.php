<?php

namespace App\DTOs;

use App\DTOs\Contracts\BaseDTO;

class CouponModelDTO extends BaseDTO
{

    public function __construct(
        public string $title,
        public string $description,
        public string $code,
        public bool   $public,
        public bool   $is_active,
        public string $amount,
        public string $minimum_purchase,
        public string $max_discount,
        public string $max_usage,
        public string $starts_at,
        public string $expire_at,
        public ?array $users_id = []
    )
    {}

    public static function fromObject(object $data): static
    {
        return new static(
            title: $data->title,
            description: $data->description,
            code: $data->code,
            public: $data->public,
            is_active: $data->is_active,
            amount: $data->amount,
            minimum_purchase: $data->minimum_purchase,
            max_discount: $data->max_discount,
            max_usage: $data->max_usage,
            starts_at: $data->starts_at,
            expire_at: $data->expire_at,
        );
    }

    public static function fromRequest(object $request): static
    {
        return new static(
            title: $request->title,
            description: $request->description,
            code: $request->code,
            public: $request->public,
            is_active: $request->is_active,
            amount: $request->amount,
            minimum_purchase: $request->minimum_purchase,
            max_discount: $request->max_discount,
            max_usage: $request->max_usage,
            starts_at: $request->starts_at,
            expire_at: $request->expire_at,
            users_id: $request->users_id,
        );
    }
}
