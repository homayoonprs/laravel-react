<?php

namespace App\Http\Resources\Account;

use App\Support\InternalOperation;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AccountCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($account) {
            $expire_at_days = Carbon::now()->diffInDays($account->expire_at);
            $diffInDays = $expire_at_days > 0 ? $expire_at_days : 0;
            $days = $account->starts_at 
            ? Carbon::parse($account->starts_at)->diffInDays($account->expire_at)
            : 0;
            return [
                'id' => $account->id,
                'username' => $account->username,
                'password' => $account->password,
                'is_active' => $account->is_active,
                'user' => $account->user,
                'plan' => $account->plan,
                'maximum_traffic_usage' => $account->maximum_traffic_usage,
                'used_traffic' => $account->used_traffic,
                'is_overflow' => $account->is_overflow,
                'starts_at' => jdate($account->starts_at)->format('Y-m-d H:i'),
                'expire_at' => jdate($account->expire_at)->format('Y-m-d H:i'),
                'remaining_days' => $diffInDays,
                'days' => $days,
                'updated_at' => jdate($account->updated_at)->format('Y-m-d H:i'),
                'created_at' => jdate($account->created_at)->format('Y-m-d H:i'),
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
