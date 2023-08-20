<?php

namespace Database\Factories;

use App\Models\Coupon;
use App\Models\Gateway;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $total_amount = $this->faker->numberBetween(1000000, 9000000);
        $discount = $this->faker->numberBetween(1000, 9000);
        $payable = $total_amount - $discount;
        return [
            'total_amount' => $total_amount,
            'discount' => $discount,
            'payable' => $payable,
            'description' => $this->faker->text(250),
            'user_id' => User::factory()->create()->id,
            'coupon_id' => Coupon::factory()->create()->id,
            'gateway_id' => Gateway::factory()->create()->id,
            'payment_at' => $this->faker->dateTime(),
        ];
    }
}
