<?php

namespace App\DTOs;

use App\DTOs\Contracts\BaseDTO;

class UserModelDTO extends BaseDTO
{
    public function __construct(
        public string  $name,
        public ?string $phone,
        public string  $email,
        public ?string $image,
        public string  $account_type,
        public ?string $account_number = null,
        public ?string $refer_code = null,
        public ?string $password = null,
        public ?array $roles_name = []
    )
    {}

    public static function fromObject(object $data): static
    {
        return new static(
            name: $data->name,
            phone: $data->phone,
            email: $data->email,
            image: $data->image,
            account_type: $data->account_type,
            account_number: $data->account_number,
            refer_code: $data->reder_code,
        );
    }

    public static function fromRequest(object $request): static
    {
        return new static(
            name: $request->name,
            phone: $request->phone,
            email: $request->email,
            image: $request->image,
            account_type: $request->account_type,
            password: $request->password,
            roles_name: $request?->roles_name ? $request->roles_name : []
        );
    }
}
