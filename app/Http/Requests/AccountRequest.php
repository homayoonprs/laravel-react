<?php

namespace App\Http\Requests;

use App\DTOs\AccountModelDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class AccountRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $routeName = $this->route()->getName();
        if (Str::contains($routeName, ['update', 'store']))
            return [
                'username' => ['required'],
                'password' => ['required'],
                'user_id' => ['required'],
                'plan_id' => ['required'],
            ];
        return [];
    }

    public function messages()
    {
        return [
            'username.required' => 'لطفا نام کاربری مورد نظر را وارد کنید',
            'password.required' => 'لطفا رمز عبور مورد نظر را وارد کنید',
            'user_id.required' => 'کاربر مورد نظر را وارد کنید',
            'plan_id.required' => 'پلن مورد نظر را انتخاب کنید',
        ];
    }

    public function toDTO(): AccountModelDTO
    {
        return AccountModelDTO::fromRequest($this);
    }
}
