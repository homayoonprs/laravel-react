<?php

namespace App\DTOs\Radius;

use App\DTOs\AccountModelDTO;
use App\DTOs\Contracts\BaseDTO;
use App\Models\Account;

class RadCheckModelDTO extends BaseDTO
{

    public function __construct(
        public string $username,
        public string $attribute,
        public string $op,
        public string $value,
    )
    {}

    public static function fromObject(object $data): static
    {
        return new static(
            username: $data->username,
            attribute: $data->attribute,
            op: $data->op,
            value: $data->value,
        );
    }

    public static function fromRequest(object $request): static
    {
        return new static(
            username: $request->username,
            attribute: $request->attribute,
            op: $request->op,
            value: $request->value,
        );
    }

    public static function fromAccount(Account $account): static
    {
        return new static (
            username: $account->username,
            attribute: 'Cleartext-Password',
            op : ':=',
            value: $account->password
        );
    }

    public static function fromAccountDTO(BaseDTO|AccountModelDTO $dto): static
    {
        return new static (
            username: $dto->username,
            attribute: 'Cleartext-Password',
            op : ':=',
            value: $dto->password
        );
    }
}
