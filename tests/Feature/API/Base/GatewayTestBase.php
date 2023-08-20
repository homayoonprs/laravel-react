<?php

namespace Tests\Feature\API\Base;

use Tests\TestCase;

class GatewayTestBase extends TestCase
{
    protected function gatewayResourceJsonStructure(): array
    {
        return [
            'operationId',
            'data' => [
                'name',
                'token',
                'is_active',
                'invoices',
                'created_at',
                'updated_at'
            ]
        ];
    }

    protected function gatewayCollectionJsonStructure(): array
    {
        return [
            'operationId',
            'data' => []
        ];
    }

    protected function validationInputs(bool $forUpdate = false): array
    {
        return [
            'name',
            'token',
            'is_active'
        ];
    }

    protected function gatewayResourceFragment($gateway): array
    {
        return [
            'name' => $gateway['name'],
            'token' => $gateway['token'],
            'is_active' => $gateway['is_active'],
            'created_at' => $gateway['created_at'],
            'updated_at' => $gateway['updated_at'],
        ];
    }

}
