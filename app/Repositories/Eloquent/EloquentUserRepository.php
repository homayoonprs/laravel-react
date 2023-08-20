<?php

namespace App\Repositories\Eloquent;

use App\DTOs\UserModelDTO;
use App\Models\User;
use App\Repositories\Contracts\EloquentBaseRepository;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class EloquentUserRepository extends EloquentBaseRepository
{

    public function __construct(User $model) {
        $this->model = $model;
    }

    public function paginatedWithFilter(): LengthAwarePaginator
    {
        return QueryBuilder::for($this->model)
            ->allowedFilters([
                'id',
                'name',
                'email',
                'phone',
                'account_type',
                'accounts.id',
                AllowedFilter::scope('personal'),
                AllowedFilter::scope('business'),
            ])
            ->latest()
            ->paginate(self::PER_PAGE);
    }

    public function syncRoles(User $targetUser, array $rolesName)
    {
        return $targetUser->syncRoles($rolesName);
    }

    public function syncPermissions(User $targetUser, array $permissionsName)
    {
        return $targetUser->syncPermissions($permissionsName);
    }

    public function updateUserProfile(User|Authenticatable $user, UserModelDTO $dto): bool
    {
        return $user->update([
            'name' => $dto->name,
        ]);
    }

    public function findOrCreateUser(string $email, string $password)
    {
        return $this->model->where('email', $email)->firstOrCreate([
            'name' => $email,
            'password' => $password,
            'email' => $email
        ]);
    }
}
