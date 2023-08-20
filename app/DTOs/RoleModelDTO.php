<?php

namespace App\DTOs;

use App\DTOs\Contracts\BaseDTO;
use App\Http\Requests\RoleRequest;

class RoleModelDTO extends BaseDTO
{
    public function __construct(
        public string $label,
        public string $name,
        public ?string $guard_name,
    ){}

    public static function fromObject(object $data): static
    {
        return new static(
            label: $data->label,
            name: $data->name,
            guard_name: $data->guard_name ?? 'web',
        );   
    }

    public static function fromRequest(object $request) : static
    {
        return new static(
            label: $request->label,
            name: $request->name,
            guard_name: $request->guard_name ?? 'web',
        );
    }
}
