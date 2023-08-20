<?php

namespace App\DTOs\Radius;

use App\DTOs\Contracts\BaseDTO;

class RadAcctModelDTO extends BaseDTO
{

    public function __construct(
        public string $username,
        public string $acctinputoctets,
        public string $acctoutputoctets,
    )
    {}

    public static function fromObject(object $data): static
    {
        return new static(
            username: $data->username,
            acctinputoctets: $data->acctinputoctets,
            acctoutputoctets: $data->acctoutputoctets,
        );
    }

    public static function fromRequest(object $request): static
    {
        return new static(
            username: $request->username,
            acctinputoctets: $request->acctinputoctets,
            acctoutputoctets: $request->acctoutputoctets,
        );
    }
}
