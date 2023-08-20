<?php

namespace App\Http\Resources\Plan;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PlanCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($plan) {
            return [
                'id' => $plan->id,
                'name' => $plan->name,
                'description' => $plan->description,
                'type' => $plan->type,
                'days' => $plan->days,
                'price' => $plan->price,
                'free_days' => $plan->free_days,
                'maximum_traffic_usage' => $plan->maximum_traffic_usage,
                'is_active' => $plan->is_active,
                'random_username_prefix' => $plan->random_username_prefix,
                'updated_at' => jdate($plan->updated_at)->format('Y-m-d H:i'),
                'created_at' => jdate($plan->created_at)->format('Y-m-d H:i'),
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
