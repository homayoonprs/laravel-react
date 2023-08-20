<?php

namespace App\Repositories\Contracts;

use App\DTOs\Contracts\BaseDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;


abstract class EloquentBaseRepository implements BaseRepository
{
    const PER_PAGE = 20;

    /**
     * Models instance.
     *
     * @var Builder|Model
     */
    protected Model | Builder $model;

    public function __construct(Model | Builder $model)
    {
        $this->model = $model;
    }

    public function paginatedWithFilter() : LengthAwarePaginator
    {
        return $this->getPaginated();
    }

    public function all() : Collection
    {
        return $this->model->all();
    }

    public function getPaginated() : LengthAwarePaginator
    {
        return $this->model->latest()->paginate(self::PER_PAGE);
    }

    public function store(BaseDTO $dto) : Model
    {
        return $this->model->create($dto->toArray());
    }

    public function update(Model $targetModel, BaseDTO $dto) : bool
    {
        return $targetModel->update($dto->toArray());
    }

    public function show(Model $targetModel) : Model
    {
        return $targetModel;
    }

    public function getByID(int $modelID): Model | \Illuminate\Database\Eloquent\Collection | Builder | array | null
    {
        return $this->model->findOrFail($modelID);
    }

    public function destroy(Model $targetModel): bool|null
    {
        return $targetModel->delete();
    }
}
