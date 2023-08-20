<?php

namespace App\Repositories\Eloquent;

use App\Actions\Invoice\CalculateInvoiceAmountsAction;
use App\DTOs\Contracts\BaseDTO;
use App\Models\Invoice;
use App\Models\User;
use App\Repositories\Contracts\EloquentBaseRepository;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class EloquentInvoiceRepository extends EloquentBaseRepository
{
    public function __construct(
        Invoice $model,
        private CalculateInvoiceAmountsAction $calculateInvoiceAmountsAction
    ) {
        $this->model = $model;
    }

    public function paginatedWithFilter(): LengthAwarePaginator
    {
        return QueryBuilder::for($this->model)
            ->allowedFilters([
                'total_amount',
                AllowedFilter::exact('user.id')
            ])
            ->allowedIncludes([
                'user'
            ])
            ->latest()
            ->paginate(self::PER_PAGE);
    }

    public function store(BaseDTO $dto): Model
    {
        $transaction = $this->model->create($dto->toArray());
        $this->calculateInvoiceAmountsAction->handle($transaction);
        return $transaction;
    }

    public function update(Model $targetModel, BaseDTO $dto) : bool
    {
        $updated = $targetModel->update($dto->toArray());
        $this->calculateInvoiceAmountsAction->handle($targetModel);
        return $updated;
    }

    public function getUserInvoices(User|Authenticatable $user): Collection
    {
        return $user->invoices()->latest()->get();
    }

    public function getOrCreateUserOpenInvoice(User|Authenticatable $user): Invoice
    {
        return $user->invoices()->whereNull('payment_at')->firstOrCreate();
    }

    public function getUserOpenInvoice(User|Authenticatable $user): Invoice|null
    {
        return $user->invoices()->whereNull('payment_at')->first();
    }
}
