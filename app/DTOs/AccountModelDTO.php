<?php

namespace App\DTOs;

use App\DTOs\Contracts\BaseDTO;

class AccountModelDTO extends BaseDTO
{

    public function __construct(
        public string $username,
        public string $password,
        public ?bool   $is_active,
        public string $user_id,
        public string $plan_id,
        public ?string $maximum_traffic_usage,
        public ?string $used_traffic,
        public ?string $is_overflow,
        public ?string $starts_at,
        public ?string $expire_at,
    )
    {}

    public static function fromObject(object $data): static
    {
        return new static(
            username: $data->username,
            password: $data->password,
            is_active: isset($data->is_active) ? $data->is_active : 0,
            user_id: $data->user_id,
            plan_id: $data->plan_id,
            maximum_traffic_usage: isset($data->maximum_traffic_usage) ? $data->maximum_traffic_usage : 0,
            used_traffic: isset($data->used_traffic) ? $data->used_traffic : 0,
            is_overflow: isset($data->is_overflow) ? $data->is_overflow : 0,
            starts_at: isset($data->starts_at) ? $data->starts_at : null,
            expire_at: isset($data->expire_at) ? $data->expire_at : null,
        );
    }

    public static function fromRequest(object $request): static
    {
        return new static(
            username: $request->username,
            password: $request->password,
            is_active: isset($request->is_active) ? $request->is_active : 0,
            user_id: $request->user_id,
            plan_id: $request->plan_id,
            maximum_traffic_usage: $request->maximum_traffic_usage,
            used_traffic: $request->used_traffic,
            is_overflow: isset($request->is_overflow) ? $request->is_overflow : 0,
            starts_at: $request->starts_at,
            expire_at: $request->expire_at,
        );
    }
}
