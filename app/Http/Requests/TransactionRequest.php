<?php

namespace App\Http\Requests;

use App\DTOs\TransactionModelDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class TransactionRequest extends FormRequest
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
                'amount' => ['required','numeric'],
                'invoice_id' => ['required'],
                'user_id' => ['required'],
                'plan_id' => ['required'],
                'account_id' => ['required'],
            ];
        return [];
    }

    public function messages()
    {
        return [
            'amount.required' => 'لطفا مبلغ تراکنش را وارد کنید',
            'amount.numeric' => 'مقدار باید یک عدد باشد',
            'invoice_id.required' => 'لطفا فاکتور تراکنش را انتخاب کنید',
            'user_id.required' => 'کاربر مورد نظر را انتخاب کنید',
            'plan_id.required' => 'لن مورد نظر را انتخاب کنید',
            'account_id.required' => 'حساب مورد نظر را انتخاب کنید',
        ];
    }

    public function toDTO(): TransactionModelDTO
    {
        return  TransactionModelDTO::fromRequest($this);
    }
}
