<?php

namespace App\Http\Requests;

use App\DTOs\RoleModelDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class RoleRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $routeName = $this->route()->getName();

        if (Str::contains($routeName,['update','store']))
            return [
                'label' => ['required','string'],
                'name' => ['required','string'],
                'guard_name' => ['string'],
                'permissions_id' => ['array']
            ];

        if (Str::contains($routeName,['sync.permissions']))
            return [
                'permissions_id' => [ 'array']
            ];

        return [];
    }

    public function messages()
    {
        return [
            'permissions_id.array' => 'به صورت ارایه وارد کنید',
        ];
    }

    public function toDTO() :RoleModelDTO
    {
        return RoleModelDTO::fromRequest($this);
    }
}
