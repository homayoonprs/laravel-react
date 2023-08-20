<?php

namespace Tests\Feature\API\Base;

use Tests\TestCase;

class AccountTestBase extends TestCase
{
    protected function accountResourceJsonStructure(): array
    {
        return [
            'operationId',
            'data' => [
                'username',
                'password',
                'radius_id',
                'state',
                'user',
                'plan',
                'transactions',
                'maximum_traffic_usage',
                'used_traffic',
                'is_overflow',
                'starts_at',
                'expire_at',
                'created_at',
                'updated_at'
            ]
        ];
    }

    protected function accountCollectionJsonStructure(): array
    {
        return [
            'operationId',
            'data' => []
        ];
    }

    protected function validationInputs(bool $forUpdate = false): array
    {
        $errors = ['name', 'email'];

        if (!$forUpdate)
            $errors[] = 'password';

        return $errors;
    }

    protected function accountResourceFragment($user): array
    {
        return [
            'name' => $user['name'],
            'phone' => $user['phone'],
            'email' => $user['email'],
            'image' => $user['image'],
            'account_type' => $user['account_type'],
            'created_at' => $user['created_at'],
            'updated_at' => $user['updated_at'],
        ];
    }

    protected function testUserInfo(): array
    {
        return [
            'name' => 'Homayoon',
            'phone' => '+989336772390',
            'email' => 'homayoon.parsaee@gmail.com',
            'password' => '12345678',
            'password_confirmation' => '12345678',
        ];
    }
}
