<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void^
     */
    public function run()
    {

        $makeAdmin = $this->command->ask('do you need make a Super Admin User? y/n','y');
        if (strtolower($makeAdmin) == 'y'){
            
            try {
                $this->call(PermissionSeeder::class);
            }catch (\Exception $exception){
                $this->command->warn("Can't Run PermissionSeeder::class Exception Message: $exception");
            }

            $email = $this->command->ask('enter Email (default: admin@mail.com)','admin@mail.com');
            $name = $this->command->ask('enter User Name (default: admin)','admin');
            $password = $this->command->ask('enter Password For User (default: 12345678)','12345678');

            try {
                $user = User::factory()->state([
                    'email' => $email,
                    'name' => $name,
                    'password' => $password,
                ])->create();
            }catch (\Exception $exception){
                $user = User::where('email',$email)->first();
                $user->update([
                    'name' => $name,
                    'password' => $password,
                ]);
            }

            $user->givePermissionTo(Permission::all()->pluck('name')->toArray());

        } else {
            $count = $this->command->ask('How many users do you need?',25);
            User::factory()
                ->count($count)
                ->create();
        }

    }
}
