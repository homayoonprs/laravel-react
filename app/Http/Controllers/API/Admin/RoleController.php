<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\Role\RoleCollection;
use App\Http\Resources\Role\RoleResource;
use App\Models\Role;
use App\Repositories\Eloquent\EloquentRoleRepository;

class RoleController extends Controller
{
    public function __construct(private EloquentRoleRepository $repository)
    {
        $this->authorizeResource(Role::class, 'role');
    }

    public function index()
    {
        return new RoleCollection($this->repository->paginatedWithFilter());
    }

    public function show(Role $role)
    {
        return new RoleResource($this->repository->show($role));
    }
    public function store(RoleRequest $request)
    {
        $role = $this->repository->store($request->toDTO());
        $role->syncPermissions($request->permissions_id);
        return new RoleResource($role);
    }

    public function update(Role $role, RoleRequest $request)
    {
        $this->repository->update($role, $request->toDTO());
        $role->syncPermissions($request->permissions_id);
        return new RoleResource($role);
    }

    public function destroy(Role $role)
    {
        $this->repository->delete($role);
        return new RoleResource($role);
    }

    public function syncPermissions(Role $role, RoleRequest $request)
    {
        $role = $this->repository->syncPermissions($role, $request->permissions_id);
        return new RoleResource($role);
    }

}
