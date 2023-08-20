<?php

namespace App\Http\Resources\Transaction;

use App\Http\Resources\Account\AccountResource;
use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TransactionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'amount' => $transaction->amount,
                'invoice' => $transaction->invoice,
                'user' => $transaction->user,
                'plan' => $transaction->plan,
                'account' => new AccountResource($transaction->account),
                'updated_at' => jdate($transaction->updated_at)->format('Y-m-d H:i'),
                'created_at' => jdate($transaction->created_at)->format('Y-m-d H:i'),
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
