<?php

namespace App\Repositories\Eloquent;

use App\Exceptions\CouponException;
use App\Models\Coupon;
use App\Models\User;
use App\Repositories\Contracts\EloquentBaseRepository;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Pagination\LengthAwarePaginator as PaginationLengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class EloquentCouponRepository extends EloquentBaseRepository
{
    public function __construct(Coupon $model) {
        $this->model = $model;
    }

    public function finByCode(string $code): Coupon
    {
        $coupon = Coupon::where('code', $code)->first();
        throw_if(!$coupon, new CouponException("کد تخفیف مد نظر در سیستم وجود ندارد"));
        return $coupon;
    }

    public function paginatedWithFilter(): LengthAwarePaginator
    {
        return QueryBuilder::for($this->model)
            ->allowedFilters([
                'code',
                'title',
                AllowedFilter::exact('public'),
                AllowedFilter::exact('enable')
            ])
            ->latest()
            ->paginate(self::PER_PAGE);
    }

    public function getPaginatedUserCoupons(User|Authenticatable $user) :PaginationLengthAwarePaginator
    {
        return $this->model::public ()->orWhereHas('users', function (Builder $query) use ($user) {
            $query->where('id', $user->id);
        })->latest()->paginate(self::PER_PAGE);
    }

    public function syncUsers(Coupon $coupon, array $usersID): array
    {
        return $coupon->users()->sync($usersID);
    }
}
