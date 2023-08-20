<?php

namespace App\Actions\Coupon;

use App\Actions\Invoice\CalculateInvoiceAmountsAction;
use App\Models\Invoice;

class HandleDetachCouponFromInvoiceAction
{

    public function __construct(
        private CalculateInvoiceAmountsAction $calculateInvoiceAmountsAction
    )
    {}

    public function handle(Invoice $invoice)
    {
        
        $invoice->update([
            'coupon_id' => null,
        ]);

        $this->calculateInvoiceAmountsAction->handle($invoice);
    
    }
    
}