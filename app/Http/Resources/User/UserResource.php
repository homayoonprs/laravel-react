<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Invoice\InvoiceCollection;
use App\Http\Resources\Role\RoleCollection;
use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'account_type' => $this->account_type,
            'account_number' => $this->account_number,
            'refer_code' => $this->refer_code,
            'email_verified_at' => jdate($this->email_verified_at)->format('Y-m-d H:i'),
            'phone_verified_at' => jdate($this->phone_verified_at)->format('Y-m-d H:i'),
            'invoices' => new InvoiceCollection($this->invoices()->get()),
            'transactions' => $this->transactions()->get(),
            'accounts' => $this->accounts()->get(),
            'roles' => new RoleCollection($this->roles()->get()),
            'permissions' => $this->permissions()->get(),
            'created_at' => jdate($this->created_at)->format('Y-m-d H:i'),
            'updated_at' => jdate($this->updated_at)->format('Y-m-d H:i'),
        ];
    }

    public function with($request)
    {
        return [
            'operation_id' => InternalOperation::getOperationId()
        ];
    }
}
