<?php

namespace App\Http\Requests;

use App\DTOs\Contracts\BaseDTO;
use App\DTOs\PlanModelDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class PlanRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $routeName = $this->route()->getName();
        if (Str::contains($routeName,['update','store']))
            return [
                'name' => ['required'],
                'type' => ['required'],
                'description' => ['required'],
                'days' => ['required','numeric'],
                'free_days' => ['numeric'],
                'price' => ['required','numeric'],
                'is_active' => ['required','boolean'],
                'random_username_prefix' => ['required'],''
            ];

        return [];
    }

    public function messages()
    {
        return [
            'name.required' => 'لطفا عنوان پلن را وارد کنید',
            'type.required' => 'لطفا نوع پلن را انتخاب کنید',
            'description.required' => 'لطفا توضیحات پلن را وارد کنید',
            'days.required' => 'لطفا تعداد روز های پلن را وارد کنید',
            'days.numeric' => 'مقدار باید یک عدد باشد',
            'price.required' => 'لطفا مبلغ پلن را وارد کنید',
            'price.numeric' => 'مقدار باید یک عدد باشد',
            'free_days.numeric' => 'مقدار باید یک عدد باشد',
            'is_active.required' => 'لطفا وضعیت پلن را مشخص کنید',
            'random_username_prefix.required' => 'لطفا پیشوند پلن را وارد کنید',
        ];
    }

    public function toDTO(): PlanModelDTO
    {
        return PlanModelDTO::fromRequest($this);
    }
}
