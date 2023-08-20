<?php

namespace Tests\Feature\API\Base;

use Tests\TestCase;

class PlanTestBase extends TestCase
{
    protected function userResourceJsonStructure(): array
    {
        return [
            'operationId',
            'data' => [
                'name',
                'type',
                'days',
                'price',
                'transactions',
                'accounts',
                'created_at',
                'updated_at'
            ]
        ];
    }

    protected function userCollectionJsonStructure(): array
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

    protected function userResourceFragment($user): array
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
