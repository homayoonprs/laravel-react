<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AccountRequest;
use App\Http\Resources\Account\AccountCollection;
use App\Http\Resources\Account\AccountResource;
use App\Models\Account;
use App\Repositories\Eloquent\EloquentAccountRepository;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function __construct(private EloquentAccountRepository $repository)
    {
        $this->authorizeResource(Invoice::class, 'invoice');
    }

    public function index()
    {
        return new AccountCollection($this->repository->paginatedWithFilter());
    }

    public function store(AccountRequest $request)
    {
        $account = $this->repository->store($request->toDTO());
        return new AccountResource($account);
    }

    public function show(Account $account)
    {
        return new AccountResource($this->repository->show($account));
    }

    public function update(AccountRequest $request, Account $account)
    {
        $this->repository->update($account, $request->toDTO());
        return new AccountResource($account);
    }

    public function generateAccountUsername(Request $request)
    {
        $request->validate([
            'prefix' => ['required'],
            'user_id' => ['required']
        ]);

        $username = Account::generateUsername($request->prefix, $request->user_id);

        return response()->json([
            'username' => $username
        ]);
    }

}
