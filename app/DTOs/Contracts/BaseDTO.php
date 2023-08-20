<?php

namespace App\DTOs\Contracts;

abstract class BaseDTO
{

    abstract public static function fromObject(object $data) :static;

    abstract public static function fromRequest(object $request) :static;

    public function toArray(): array
    {
        return call_user_func('get_object_vars', $this);
    }

}
