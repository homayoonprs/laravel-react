<?php

namespace App\Http\Requests;

use App\DTOs\GatewayModelDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class GatewayRequest extends FormRequest
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
                'name' => ['required'],
                'endpoint' => ['required'],
                'is_active' => ['required'],
                'for' => ['required'],
            ];
        return [];
    }

    public function messages()
    {
        return [
            'name.required' => 'لطفا عنوان درگاه را وارد کنید',
            'endpoint.required' => 'لطفا توکن درگاه را وارد کنید',
            'is_active.required' => 'لطفا وضعیت درگاه را انتخاب کنید',
            'for.required'  => 'لطفا نوع درگاه را مشخص کنید'
        ];
    }

    public function toDTO(): GatewayModelDTO
    {
        return GatewayModelDTO::fromRequest($this);
    }
}
