<?php

namespace Tests\Feature\API\Base;

use Tests\TestCase;

class InvoiceTestBase extends TestCase
{
    protected function invoiceResourceJsonStructure(): array
    {
        return [
            'operationId',
            'data' => [
                'amount',
                'description',
                'user',
                'coupon',
                'gateway',
                'transactions',
                'state',
                'payment_at',
                'created_at',
                'updated_at'
            ]
        ];
    }

    protected function invoiceCollectionJsonStructure(): array
    {
        return [
            'operationId',
            'data' => []
        ];
    }


    protected function invoiceResourceFragment($invoice): array
    {
        return [
            'amount' => $invoice['amount'],
            'description' => $invoice['description'],
            'user' => $invoice['user'],
            'coupon' => $invoice['coupon'],
            'gateway' => $invoice['gateway'],
            'transactions' => $invoice['transactions'],
            'state' => $invoice['state'],
            'payment_at' => $invoice['payment_at'],
            'created_at' => $invoice['created_at'],
            'updated_at' => $invoice['updated_at'],
        ];
    }

}
