<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name(),
            'description' => $this->faker->text(250),
            'code' => $this->faker->numberBetween(1000000,9000000),
            'public' => $this->faker->boolean(),
            'is_active' => $this->faker->boolean(),
            'amount' => $this->faker->numberBetween(1000000,9000000),
            'minimum_purchase' => $this->faker->numberBetween(1000000,9000000),
            'max_discount' => $this->faker->numberBetween(1000000,9000000),
            'max_usage' => $this->faker->numberBetween(1,5),
            'starts_at' => $this->faker->dateTime(),
            'expire_at' => $this->faker->dateTime(),
        ];
    }
}
