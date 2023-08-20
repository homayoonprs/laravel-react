<?php

namespace App\Http\Resources\Permission;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PermissionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($permission) {
            return [...$permission->toArray()];
        });
    }

    public function with($request)
    {
        return [
            'operationId' => InternalOperation::getOperationId()
        ];
    }
}
