<?php

namespace App\Http\Requests;

use App\DTOs\CouponModelDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CouponRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $routeName = $this->route()->getName();
        if (Str::contains($routeName, ['update','store']))
            return [
                'title' => ['required'],
                'description' => ['required'],
                'code' => ['required', !Str::contains($routeName, ['update']) ? "unique:coupons,code,{$this->code}" : ''],
                'public' => ['required','boolean'],
                'amount' => ['required','numeric'],
                'minimum_purchase' => ['required','numeric'],
                'max_discount' => ['required','numeric'],
                'max_usage' => ['required','numeric'],
                'starts_at' => ['required'],
                'expire_at' => ['required'],
                'users_id' => Rule::requiredIf(!request()->public)
            ];

        if (Str::contains($routeName, ['attachToInvoice']))
            return [
                'coupon_code' => ['required', 'exists:coupons,code', 'string']
            ];

        return [];
    }

    public function messages()
    {
        return [
            'title.required' => 'لطفا عنوان کد تخفیف را وارد کنید',
            'description.required' => 'لطفا توضیحات کد تخفیف را وارد کنید',
            'code.required' => 'لطفا کد تخفیف را وارد کنید',
            'code.unique' => 'این کد قبلا انتخاب شده است',
            'public.required' => 'لطفا وضعیت کد را مشخص کنید',
            'amount.required' => 'لفا ملبغ کد تخفیف را وارد کنید',
            'amount.numeric' => 'لطفا یک مقدار عددی وارد کنید',
            'minimum_purchase.required' => 'لطفا حد اقل خرید برای اعمال کد را وارد کنید',
            'minimum_purchase.numeric' => 'لطفا یک مقدار عددی وارد کنید',
            'max_discount.required' => 'لطفا حداکثر تخفیف را وارد کنید',
            'max_discount.numeric' => 'لطفا یک مقدار عددی وارد کنید',
            'max_usage.required' => 'لطفا حد اکثر دفعات استفاده را وراد کنید',
            'max_usage.numeric' => 'لطفا یک مقدار عددی وارد کنید',
            'starts_at.required' => 'لطفا تاریخ شروع کد تفیف را وارد کنید',
            'expire_at.required' => 'لطفا تاریخ انقضاء کد تخفیف را وارد کنید',
            'coupon_code.required' => 'لطفا کد تخفیف را وارد کنید',
            'coupon_code.exists' => 'کد تخفیف مدنظر در سیستم وجود ندارد',
            'users_id.required' => 'لطفا کاربران هدف مدنظر را انتخاب کنید'
        ];
    }

    public function toDTO(): CouponModelDTO
    {
        return CouponModelDTO::fromRequest($this);
    }
}
