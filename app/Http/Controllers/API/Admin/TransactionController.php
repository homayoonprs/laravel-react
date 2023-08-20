<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;
use App\Http\Resources\Invoice\InvoiceResource;
use App\Http\Resources\Transaction\TransactionCollection;
use App\Http\Resources\Transaction\TransactionResource;
use App\Models\Invoice;
use App\Models\Transaction;
use App\Repositories\Eloquent\EloquentInvoiceRepository;
use App\Repositories\Eloquent\EloquentTransactionRepository;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function __construct(
        private EloquentTransactionRepository $repository
    )
    {
        $this->authorizeResource(Invoice::class, 'invoice');
    }

    public function index()
    {
        return new TransactionCollection($this->repository->paginatedWithFilter());
    }

    public function store(TransactionRequest $request)
    {
        $transaction = $this->repository->store($request->toDTO());
        return new TransactionResource($transaction);
    }

    public function show(Transaction $transaction)
    {
        return new TransactionResource($this->repository->show($transaction));
    }

    public function update(TransactionRequest $request, Transaction $transaction)
    {
        $this->repository->update($transaction, $request->toDTO());
        return new TransactionResource($transaction);
    }

}
