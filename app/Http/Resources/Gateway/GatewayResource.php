<?php

namespace App\Http\Resources\Gateway;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\JsonResource;

class GatewayResource extends JsonResource
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
            'endpoint' => $this->endpoint,
            'is_active' => $this->is_active,
            'for' => $this->for,
            'invoices' => $this->invoices()->get(),
            'updated_at' => jdate($this->updated_at)->format('Y-m-d H:i'),
            'created_at' => jdate($this->created_at)->format('Y-m-d H:i'),
        ];
    }


    public function with($request)
    {
        return [
            'operation_id' => InternalOperation::getOperationId()
        ];
    }
}
