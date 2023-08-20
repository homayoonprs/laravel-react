<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(PlanSeeder::class);
        $this->call(AccountSeeder::class);
        $this->call(GatewaySeeder::class);
        $this->call(InvoiceSeeder::class);
    }
}
