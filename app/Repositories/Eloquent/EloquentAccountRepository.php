<?php

namespace App\Repositories\Eloquent;

use App\DTOs\AccountModelDTO;
use App\DTOs\Contracts\BaseDTO;
use App\DTOs\Radius\RadCheckModelDTO;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\User;
use App\Repositories\Contracts\EloquentBaseRepository;
use App\Repositories\Eloquent\Radius\EloquentRadCheckRepository;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class EloquentAccountRepository extends EloquentBaseRepository
{
    public function __construct(
        Account $model,
        private EloquentRadCheckRepository $eloquentRadCheckRepository
    ) {
        $this->model = $model;
    }

    public function update(Model $targetModel, BaseDTO|AccountModelDTO $dto): bool
    {
        if($dto->is_active){
            $radCheckDTO = RadCheckModelDTO::fromAccountDTO($dto);
            if($targetModel->radCheck()){
                $this->eloquentRadCheckRepository->update($targetModel->radCheck(), $radCheckDTO);
            }
        }elseif($targetModel->radCheck()){
            $this->eloquentRadCheckRepository->destroy($targetModel->radCheck());
        }

        return $targetModel->update($dto->toArray());
    }

    public function destroy(Model $targetModel): bool|null
    {
        if($targetModel->radCheck()){
            $this->eloquentRadCheckRepository->destroy($targetModel->radCheck());
        }

        return $targetModel->delete();
    }

    public function getPaginatedUserActiveAccounts(User|Authenticatable $user): LengthAwarePaginator
    {
        return $user->accounts()->where('is_active',true)->latest()->paginate(self::PER_PAGE);
    }


    public function attachTransaction(Account $account, Transaction $transaction)
    {
        return $account->update([
            'transaction_id' => $transaction->id
        ]);
    }
}
