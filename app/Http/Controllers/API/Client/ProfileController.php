<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\User\UserResource;
use App\Repositories\Eloquent\EloquentUserRepository;

class ProfileController extends Controller
{
    public function __construct(private EloquentUserRepository $userRepository)
    {
        
    }

    public function updateMyprofile(UserRequest $request)
    {
        $this->userRepository->updateUserProfile(auth()->user(), $request->toDTO());
        return new UserResource(auth()->user());
    }
}
