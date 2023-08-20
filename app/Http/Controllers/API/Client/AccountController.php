<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\Account\AccountCollection;
use App\Repositories\Eloquent\EloquentAccountRepository;

class AccountController extends Controller
{
    public function __construct(private EloquentAccountRepository $accountRepository)
    {}
   
    public function index()
    {
        return new AccountCollection($this->accountRepository->getPaginatedUserActiveAccounts(auth()->user()));
    }
}
