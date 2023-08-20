<?php

namespace App\Http\Resources\User;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'account_type' => $user->account_type,
                'account_number' => $user->account_number,
                'refer_code' => $user->refer_code,
                'roles' => $user->roles()->get(),
                'permissions' => $user->permissions()->get(),
                'email_verified_at' => jdate($user->email_verified_at)->format('Y-m-d H:i'),
                'phone_verified_at' => jdate($user->phone_verified_at)->format('Y-m-d H:i'),
                'created_at' => jdate($user->created_at)->format('Y-m-d H:i'),
                'updated_at' => jdate($user->updated_at)->format('Y-m-d H:i'),
            ];
        });
    }

    public function with($request)
    {
        return [
            'operation_id' => InternalOperation::getOperationId()
        ];
    }
}
