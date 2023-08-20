<?php

namespace App\Repositories\Eloquent;

use App\Actions\Invoice\CalculateInvoiceAmountsAction;
use App\DTOs\Contracts\BaseDTO;
use App\Models\Account;
use App\Models\Transaction;
use App\Repositories\Contracts\EloquentBaseRepository;
use Illuminate\Database\Eloquent\Model;

class EloquentTransactionRepository extends EloquentBaseRepository
{
    public function __construct(
        Transaction $model,
        private CalculateInvoiceAmountsAction $calculateInvoiceAmountsAction
    ) {
        $this->model = $model;
    }

    public function store(BaseDTO $dto): Model
    {
        $transaction = $this->model->create($dto->toArray());
        $this->calculateInvoiceAmountsAction->handle($transaction->invoice);
        return $transaction;
    }

    public function update(Model $targetModel, BaseDTO $dto) : bool
    {
        $updated = $targetModel->update($dto->toArray());
        $this->calculateInvoiceAmountsAction->handle($targetModel->invoice);
        return $updated;
    }

    public function destroy(Model $targetModel): ?bool
    {
        $destroyed = $targetModel->delete();
        $this->calculateInvoiceAmountsAction->handle($targetModel->invoice);
        return $destroyed;
    }

    public function attachAccount(Transaction $transaction, Account $account)
    {
        return $transaction->update([
            'account_id' => $account->id
        ]);
    }
}
