<?php

namespace App\Repositories\Eloquent;

use App\Models\Role;
use App\Repositories\Contracts\EloquentBaseRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\QueryBuilder;

class EloquentRoleRepository extends EloquentBaseRepository
{
    public function __construct(Role $model) {
        $this->model = $model;
    }

    public function paginatedWithFilter(): LengthAwarePaginator
    {
        return QueryBuilder::for($this->model)
            ->allowedFilters([
                'label',
                'name',
            ])
            ->latest()
            ->paginate(self::PER_PAGE);
    }

    public function delete(Role $model)
    {
        $model->syncPermissions();
        return $model->delete();
    }

    public function syncPermissions(Role $targetRole, array $permissionsName)
    {
        return $targetRole->syncPermissions($permissionsName);
    }

    /**
     * @param Role $role
     */
    public function getRolePermissions(Role $role)
    {
        return [
            $role->permissions->groupBy('model'),
            $role->label
        ];
    }
}
