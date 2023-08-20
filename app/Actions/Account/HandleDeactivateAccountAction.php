<?php

namespace App\Actions\Account;

use App\DTOs\AccountModelDTO;
use App\DTOs\Radius\RadCheckModelDTO;
use App\Models\Account;
use App\Repositories\Eloquent\EloquentAccountRepository;
use App\Repositories\Eloquent\Radius\EloquentRadCheckRepository;

class HandleDeactivateAccountAction
{
    public function __construct(
        private EloquentAccountRepository $accountrepository,
        private EloquentRadCheckRepository $eloquentRadCheckRepository
    )
    {}
    public function handle(Account $account)
    {
        $accountData = (object) [
            ...$account->toArray(),
            'is_active' => false,
        ];
        $accountDTO = AccountModelDTO::fromObject($accountData);
        $this->accountrepository->update($account, $accountDTO);
    }
    
}