<?php

namespace App\Actions\Account;

use App\DTOs\AccountModelDTO;
use App\DTOs\Radius\RadCheckModelDTO;
use App\Models\Account;
use App\Repositories\Eloquent\EloquentAccountRepository;
use App\Repositories\Eloquent\Radius\EloquentRadCheckRepository;

class HandleActivateAccountAction
{
    public function __construct(
        private EloquentAccountRepository $accountrepository,
        private EloquentRadCheckRepository $eloquentRadCheckRepository
    )
    {}

    public function handle(Account $account)
    {
        $days = $account->plan->days+$account->plan->free_days;
        $starts_at = now();
        $expire_at = generateExpireDate($starts_at,$days);
        $accountData = (object) [
            ...$account->toArray(),
            'is_active' => true,
            'starts_at' => $starts_at,
            'expire_at' => $expire_at
        ];
        $accountDTO = AccountModelDTO::fromObject($accountData);
        $this->accountrepository->update($account, $accountDTO);

        $radCheckDTO = RadCheckModelDTO::fromAccountDTO($accountDTO);
        $this->eloquentRadCheckRepository->store($radCheckDTO);
    }
    
}