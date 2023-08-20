<?php

namespace App\Http\Resources\Role;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'label' => $this->label,
            'guard_name' => $this->guard_name,
            'permissions' => $this->permissions()->get(),
            'created_at' => jdate($this->created_at)->format('Y-m-d H:i'),
            'updated_at' => jdate($this->updated_at)->format('Y-m-d H:i'),
        ];
    }

    public function with($request)
    {
        return [
            'operationId' => InternalOperation::getOperationId()
        ];
    }
}
