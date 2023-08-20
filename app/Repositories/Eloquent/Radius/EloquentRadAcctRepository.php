<?php

namespace App\Repositories\Eloquent\Radius;

use App\Models\Radius\RadAcct;
use App\Repositories\Contracts\EloquentBaseRepository;

class EloquentRadAcctRepository extends EloquentBaseRepository
{
    public function __construct(RadAcct $model) {
        $this->model = $model;
    }
}
