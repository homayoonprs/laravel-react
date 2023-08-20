<?php

namespace App\Http\Resources\Invoice;

use App\Http\Resources\Transaction\TransactionCollection;
use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
            'total_amount' => $this->total_amount,
            'payable' => $this->payable,
            'discount' => $this->discount,
            'description' => $this->description,
            'user' => $this->user,
            'coupon' => $this->coupon,
            'gateway' => $this->gateway,
            'transactions' => new TransactionCollection($this->transactions()->get()),
            'payment_at' => $this->payment_at ? jdate($this->payment_at)->format('Y-m-d H:i') : null,
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
