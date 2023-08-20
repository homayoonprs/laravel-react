<?php

namespace App\Repositories\Contracts;


use App\DTOs\Contracts\BaseDTO;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface BaseRepository
{

    public function all() : Collection;

    public function getPaginated() : LengthAwarePaginator;

    public function store(BaseDTO $dto) : Model;

    public function update(Model $targetModel, BaseDTO $dto) : bool;

    public function show(Model $model) : Model;

    public function getByID(int $modelID): Model | \Illuminate\Database\Eloquent\Collection | Builder | array | null;

    public function destroy(Model $model): bool|null;

}
