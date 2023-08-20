<?php

namespace App\Repositories\Eloquent\Radius;

use App\Models\Radius\RadCheck;
use App\Repositories\Contracts\EloquentBaseRepository;

class EloquentRadCheckRepository extends EloquentBaseRepository
{
    public function __construct(RadCheck $model) {
        $this->model = $model;
    }
}
