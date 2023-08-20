<?php

namespace App\Exceptions;

use Exception;

class CouponException extends Exception
{

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
            'errors' => [
                'coupon' => $this->getMessage()
            ]
        ],422);
    }

}
