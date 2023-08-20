<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Repositories\Eloquent\EloquentUserRepository;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(private EloquentUserRepository $userRepository)
    {
        $this->authorizeResource(User::class, 'user');
    }

    public function index()
    {
        return new UserCollection($this->userRepository->paginatedWithFilter());
    }

    public function store(UserRequest $request)
    {
        $dto = $request->toDTO();
        $user = $this->userRepository->store($dto);
        
        if(sizeof($dto->roles_name) > 0 && auth()->user()->hasPermissionTo('user_sync_role')){
            $this->userRepository->syncRoles($user,$dto->roles_name);
        }

        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($this->userRepository->show($user));
    }

    public function update(User $user, UserRequest $request)
    {
        $dto = $request->toDTO();
        $this->userRepository->update($user, $dto);

        if(auth()->user()->hasPermissionTo('user_sync_role')){
            $this->userRepository->syncRoles($user,$dto->roles_name);
        }

        return new UserResource($user);
    }

    public function getMe()
    {
        return new UserResource(auth()->user());
    }

    public function syncRoles(User $user,UserRequest $request)
    {
        $this->authorize('user_sync_role', $user);
        $user = $this->userRepository->syncRoles($user,$request->roles_name);
        return new UserResource($user);
    }

    public function syncPermissions(User $user, UserRequest $request)
    {
        return abort(403);
        $this->authorize('user_sync_permission', $user);
        $user = $this->userRepository->syncPermissions($user,$request->permissions_name);
        return new UserResource($user);
    }
}
