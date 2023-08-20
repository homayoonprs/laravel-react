<?php

namespace App\Actions\Invoice;

use App\Models\Invoice;

class CalculateInvoiceAmountsAction
{

    public function handle(Invoice $invoice)
    {
        $totalAmount = $invoice->transactions()->sum('amount');
        $discount = $invoice->coupon ? $invoice->coupon->amount : 0;
        $payable = $totalAmount - $discount;
        $invoice->update([
            'total_amount' => $totalAmount,
            'discount' => $discount,
            'payable' => $payable,
        ]);
    }
    
}