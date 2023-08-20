<?php

namespace App\Http\Resources\Account;

use App\Support\InternalOperation;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $expire_at_days = Carbon::now()->diffInDays($this->expire_at);
        $diffInDays = $expire_at_days > 0 ? $expire_at_days : 0;
        $days = $this->starts_at 
            ? Carbon::parse($this->starts_at)->diffInDays($this->expire_at)
            : 0;
            
        return [
            'id' => $this->id,
            'username' => $this->username,
            'password' => $this->password,
            'is_active' => $this->is_active,
            'user' => $this->user,
            'plan' => $this->plan,
            'transaction' => $this->transaction,
            'maximum_traffic_usage' => $this->maximum_traffic_usage,
            'used_traffic' => $this->used_traffic,
            'is_overflow' => $this->is_overflow,
            'starts_at' => jdate($this->starts_at)->format('Y-m-d H:i'),
            'expire_at' => jdate($this->expire_at)->format('Y-m-d H:i'),
            'remaining_days' => $diffInDays,
            'days' => $days,
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
