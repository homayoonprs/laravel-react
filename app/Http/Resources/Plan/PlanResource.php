<?php

namespace App\Http\Resources\Plan;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanResource extends JsonResource
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
            'description' => $this->description,
            'type' => $this->type,
            'days' => $this->days,
            'price' => $this->price,
            'free_days' => $this->free_days,
            'maximum_traffic_usage' => $this->maximum_traffic_usage,
            'transactions' => $this->transactions()->get(),
            'accounts' => $this->accounts()->get(),
            'is_active' => $this->is_active,
            'random_username_prefix' => $this->random_username_prefix,
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
