<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
 */
class PlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(450),
            'type' => $this->faker->randomElement(['dedicated','vip','normal']),
            'days' => $this->faker->numberBetween(30,365),
            'price' => $this->faker->numberBetween(40000,1000000),
            'free_days' => $this->faker->numberBetween(1,60),
            'maximum_traffic_usage' => $this->faker->numberBetween(40000,1000000),
            'random_username_prefix' => $this->faker->text(5),
            'is_active' => $this->faker->boolean(),
        ];
    }
}
