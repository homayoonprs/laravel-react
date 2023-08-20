<?php

namespace App\Http\Requests;

use App\DTOs\UserModelDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $routeName = $this->route()->getName();

        if (Str::contains($routeName, ['updateMyProfile']))
            return [
                "name" => ['required','string'],
            ];

        if (Str::contains($routeName, ['store']))
            return [
                "name" => ['required','string'],
                "email" => ['required','email',"unique:users,email,{$this->email}"],
                "password" => ['required' ,'min:8'],
                "account_type" => ['required'],
            ];

        if (Str::contains($routeName, ['update']))
            return [
                "name" => ['required','string'],
                "account_type" => ['required'],
            ];

        return [];
    }

    public function messages()
    {
        return [
            'name.required' => 'لطفا نام کاربر را وارد کنید',
            'password.required' => 'لطفا رمزعبور کاربر را وارد کنید',
            'email.required' => 'لطفا ایمیل کاربر را وارد کنید',
            'email.email' => 'لطفا یک ایمیل معتبر وارد کنید',
            'email.unique' => 'این ایمیل قبلا انتخاب شده است',
            'account_type.required' => 'لطفا نوع کاربر را انتخاب کنید',
        ];
    }

    public function toDTO() :UserModelDTO
    {
        return UserModelDTO::fromRequest($this);
    }
}
