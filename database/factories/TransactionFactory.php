<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\Invoice;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'amount' => $this->faker->numberBetween(1000000,9000000),
            'invoice_id' => Invoice::factory()->create()->id,
            'user_id' => User::factory()->create()->id,
            'plan_id' => Plan::factory()->create()->id,
            'account_id' => Account::factory()->create()->id,
        ];
    }
}
