<?php

namespace App\DTOs;

use App\DTOs\Contracts\BaseDTO;

class GatewayModelDTO extends BaseDTO
{

    public function __construct(
        public string $name,
        public string $endpoint,
        public bool $is_active,
        public string $for,
    )
    {}

    public static function fromObject(object $data): static
    {
        return new static(
            name: $data->name,
            endpoint: $data->endpoint,
            is_active: $data->is_active,
            for: $data->for,
        );
    }

    public static function fromRequest(object $request): static
    {
        return new static(
            name: $request->name,
            endpoint: $request->endpoint,
            is_active: $request->is_active,
            for: $request->for,
        );
    }
}
