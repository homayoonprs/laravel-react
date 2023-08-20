<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GatewayRequest;
use App\Http\Resources\Gateway\GatewayCollection;
use App\Http\Resources\Gateway\GatewayResource;
use App\Models\Gateway;
use App\Repositories\Eloquent\EloquentGatewayRepository;
use Illuminate\Http\Request;

class GatewayController extends Controller
{

    public function __construct(private EloquentGatewayRepository $repository)
    {
        $this->authorizeResource(Gateway::class, 'gateway');
    }

    public function index()
    {
        return new GatewayCollection($this->repository->paginatedWithFilter());
    }

    public function show(Gateway $gateway)
    {
        return new GatewayResource($this->repository->show($gateway));
    }

    public function update(GatewayRequest $request, Gateway $gateway)
    {
        $this->repository->update($gateway, $request->toDTO());
        return new GatewayResource($gateway);
    }
}
