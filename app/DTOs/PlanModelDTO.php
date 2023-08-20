<?php

namespace App\DTOs;

use App\DTOs\Contracts\BaseDTO;

class PlanModelDTO extends BaseDTO
{
    public function __construct(
        public string $name,
        public string $description,
        public string $type,
        public string $days,
        public string $price,
        public string $free_days,
        public ?string $maximum_traffic_usage,
        public bool   $is_active,
        public string $random_username_prefix
    )
    {}

    public static function fromObject(object $data): static
    {
        return new static(
            name: $data->name,
            description: $data->description,
            type: $data->type,
            days: $data->days,
            price: $data->price,
            free_days: $data->free_days,
            maximum_traffic_usage: $data->maximum_traffic_usage,
            is_active: $data->is_active,
            random_username_prefix: $data->random_username_prefix
        );
    }

    public static function fromRequest(object $request): static
    {
        return new static(
            name: $request->name,
            description: $request->description,
            type: $request->type,
            days: $request->days,
            price: $request->price,
            free_days: $request->free_days,
            maximum_traffic_usage: $request?->maximum_traffic_usage ? $request->maximum_traffic_usage : 0,
            is_active: $request->is_active,
            random_username_prefix: $request->random_username_prefix
        );
    }
}
