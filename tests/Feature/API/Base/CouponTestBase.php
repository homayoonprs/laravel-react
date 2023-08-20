<?php

namespace Tests\Feature\API\Base;

use Tests\TestCase;

class CouponTestBase extends TestCase
{
    protected function couponResourceJsonStructure(): array
    {
        return [
            'operationId',
            'data' => [
                'title',
                'description',
                'code',
                'public',
                'amount',
                'minimum_purchase',
                'max_discount',
                'max_usage',
                'users',
                'invoices',
                'starts_at',
                'expired_at',
                'created_at',
                'updated_at'
            ]
        ];
    }

    protected function couponCollectionJsonStructure(): array
    {
        return [
            'operationId',
            'data' => []
        ];
    }

    protected function validationInputs(bool $forUpdate = false): array
    {
        return [
            'title',
            'description',
            'code',
            'public',
            'type',
            'amount',
            'minimum_purchase',
            'max_discount',
            'max_usage',
            'start_at',
            'expired_at',
        ];
    }

    protected function couponResourceFragment($coupon): array
    {
        return [
            'title' => $coupon['title'],
            'description' => $coupon['description'],
            'code' => $coupon['code'],
            'public' => $coupon['public'],
            'type' => $coupon['type'],
            'amount' => $coupon['amount'],
            'minimum_purchase' => $coupon['minimum_purchase'],
            'max_discount' => $coupon['max_discount'],
            'max_usage' => $coupon['max_usage'],
            'start_at' => $coupon['start_at'],
            'expired_at' => $coupon['expired_at'],
            'created_at' => $coupon['created_at'],
            'updated_at' => $coupon['updated_at'],
        ];
    }
}
