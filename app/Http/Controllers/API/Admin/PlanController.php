<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PlanRequest;
use App\Http\Resources\Plan\PlanCollection;
use App\Http\Resources\Plan\PlanResource;
use App\Models\Plan;
use App\Repositories\Eloquent\EloquentPlanRepository;
use Exception;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function __construct(private EloquentPlanRepository $repository)
    {
        $this->authorizeResource(Plan::class, 'plan');
    }

    public function index()
    {
        return new PlanCollection($this->repository->paginatedWithFilter());
    }

    public function store(PlanRequest $request)
    {
        $plan = $this->repository->store($request->toDTO());
        return new PlanResource($plan);
    }

    public function show(Plan $plan)
    {
        return new PlanResource($this->repository->show($plan));
    }

    public function update(PlanRequest $request, Plan $plan)
    {
        $this->repository->update($plan, $request->toDTO());
        return new PlanResource($plan);
    }

    public function destroy(Plan $plan)
    {
        try{
            $this->repository->destroy($plan);
        }catch(Exception $e){
            return response()->json([
                'message' => 'پلن به تعدادی اکانت اختصاص داده شده است و شما اجازه حذف آنرا ندارید',
            ], 400);
        }
        return new PlanResource($plan);
    }
}
