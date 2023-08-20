<?php

namespace App\Http\Resources\Invoice;

use App\Support\InternalOperation;
use Illuminate\Http\Resources\Json\ResourceCollection;

class InvoiceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($invoice) {
            return [
                'id' => $invoice->id,
                'total_amount' => $invoice->total_amount,
                'payable' => $invoice->payable,
                'discount' => $invoice->discount,
                'description' => $invoice->description,
                'user' => $invoice->user,
                'coupon' => $invoice->coupon,
                'gateway' => $invoice->gateway,
                'payment_at' => $invoice->payment_at ? jdate($invoice->payment_at)->format('Y-m-d H:i') : null,
                'updated_at' => jdate($invoice->updated_at)->format('Y-m-d H:i'),
                'created_at' => jdate($invoice->created_at)->format('Y-m-d H:i'),
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
