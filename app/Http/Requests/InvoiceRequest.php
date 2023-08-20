<?php

namespace App\Http\Requests;

use App\DTOs\InvoiceModelDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class InvoiceRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $routeName = $this->route()->getName();

        if (Str::contains($routeName, ['addPlanToInvoice']))
            return [
                'count' => ['required', 'numeric']
            ];

        if (Str::contains($routeName, ['update','store']))
            return [
                'user_id' => ['required']
            ];

        if (Str::contains($routeName, ['storingAccountAndTransactionForInvoice', 'updatingAccountAndTransactionOfInvoice']))
            return [
                'username' => ['required'],
                'password' => ['required'],
                'user_id' => ['required'],
                'plan_id' => ['required'],
                'invoice_id' => ['required'],
                'amount' => ['required','numeric'],
            ];

        return [];
    }

    public function messages()
    {
        return [
            'description.required' => 'لطفا توضیحات فاکتور را وارد کنید',
            'user_id.required' => 'لطفا یک کاربر برای فاکتور انتخاب کنید',
            'username.required' => 'لطفا نام کاربری مورد نظر را وارد کنید',
            'password.required' => 'لطفا رمز عبور مورد نظر را وارد کنید',
            'plan_id.required' => 'پلن مورد نظر را انتخاب کنید',
            'invoice_id.required' => 'فاکتور مورد نظر را انتخاب کنید',
            'amount.required' => 'لطفا مبلغ تراکنش را وارد کنید',
            'amount.numeric' => 'مقدار باید یک عدد باشد',
            'count.required' => 'لطفا تعداد اشتراک را وارد کنید',
            'count.numeric' => 'تعداد باید یک عدد باشد',
        ];
    }

    public function toDTO(): InvoiceModelDTO
    {
        return InvoiceModelDTO::fromRequest($this);
    }
}
