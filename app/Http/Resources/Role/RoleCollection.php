<?php

namespace App\Http\Resources\Role;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RoleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'label' => $role->label,
                'guard_name' => $role->guard_name,
                'permissions' => $role->permissions()->get(),
                'created_at' => jdate($role->created_at)->format('Y-m-d H:i'),
                'updated_at' => jdate($role->updated_at)->format('Y-m-d H:i'),
            ];
        });
    }

    public function with($request)
    {
        return [
            'operationId' => InternalOperation::getOperationId()
        ];
    }
}
