<?php

namespace App\Actions\Coupon;

use App\Actions\Invoice\CalculateInvoiceAmountsAction;
use App\Exceptions\CouponException;
use App\Models\Coupon;
use App\Models\Invoice;

class HandleAttachCouponToInvoiceAction
{

    public function __construct(
        private CalculateInvoiceAmountsAction $calculateInvoiceAmountsAction
    )
    {}

    public function handle(Coupon $coupon, Invoice $invoice)
    {
    
        throw_if(
            !$coupon->is_active,
            new CouponException('کد تخفیف مد نظر در سیستم وجود ندارد')
        );

        throw_if(
            !$coupon->is_active,
            new CouponException('کد تخفیف مد نظر در سیستم وجود ندارد')
        );

        throw_if(
            !$coupon->public && !$coupon->belongsToUser($invoice->user),
            new CouponException('شما به این کد تخفیف دسترسی ندارید')
        );

        throw_if(
            $coupon->isExpired(),
            new CouponException('کد تخفیف منقضی شده است')
        );

        throw_if(
            !$coupon->isStarted(),
            new CouponException('کد تخفیف مد نظر در سیستم وجود ندارد')
        );

        throw_if(
            $coupon->isUsageLimitExceeded($invoice->user),
            new CouponException("کد قبلا استفاده شده است. کد بیشتر از {$coupon->max_usage} بار قابل استفاده نیست")
        );

        throw_if(
            $coupon->minimum_purchase != 0 && $invoice->total_amount < $coupon->minimum_purchase,
            new CouponException("برای اعمال این کد تخفیف مبلغ فاکتور باید حداقل {$coupon->minimum_purchase} تومان باشد.")
        );

        $invoice->update([
            'coupon_id' => $coupon->id
        ]);

        $this->calculateInvoiceAmountsAction->handle($invoice);
        
    }
    
}