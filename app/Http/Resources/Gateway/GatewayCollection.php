<?php

namespace App\Http\Resources\Gateway;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GatewayCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($gateway) {
            return [
                'id' => $gateway->id,
                'name' => $gateway->name,
                'endpoint' => $gateway->endpoint,
                'is_active' => $gateway->is_active,
                'for' => $gateway->for,
                'updated_at' => jdate($gateway->updated_at)->format('Y-m-d H:i'),
                'created_at' => jdate($gateway->created_at)->format('Y-m-d H:i'),
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
