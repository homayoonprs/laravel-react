<?php

namespace App\Repositories\Eloquent;

use App\Models\Plan;
use App\Repositories\Contracts\EloquentBaseRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class EloquentPlanRepository extends EloquentBaseRepository
{
    public function __construct(Plan $model) {
        $this->model = $model;
    }

    public function getActives()
    {
        return $this->model->active()->orderBy('days')->get();
    }

    public function paginatedWithFilter(): LengthAwarePaginator
    {
        return QueryBuilder::for($this->model)
            ->allowedFilters([
                'name',
                'price',
                'days',
                'free_days',
                'type',
                'is_active',
                AllowedFilter::scope('active'),
                AllowedFilter::scope('deactive')
            ])
            ->latest()
            ->paginate(self::PER_PAGE);
    }

    public function createAccountAndTransactionForPlan(Plan $plan)
    {
        
    }
}
