<?php

namespace Database\Factories;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'username' => $this->faker->numberBetween(1000000,9999999),
            'password' => $this->faker->numberBetween(1000000,9999999),
            'is_active' => $this->faker->boolean(),
            'user_id' => User::factory()->create()->id,
            'plan_id' => Plan::factory()->create()->id,
            'maximum_traffic_usage' => $this->faker->numberBetween(10000000,99999999),
            'used_traffic' => $this->faker->numberBetween(10000000,99999999),
            'is_overflow' => $this->faker->boolean(),
            'starts_at' => $this->faker->dateTime(),
            'expire_at' => $this->faker->dateTime(),
        ];
    }
}
