<?php

namespace App\Repositories\Eloquent;

use App\Models\Gateway;
use App\Repositories\Contracts\EloquentBaseRepository;

class EloquentGatewayRepository extends EloquentBaseRepository
{
    public function __construct(Gateway $model) {
        $this->model = $model;
    }
}
