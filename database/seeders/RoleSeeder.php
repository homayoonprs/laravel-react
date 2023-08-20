<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['label' => 'ادمین', 'name' => 'admin'],
            ['label' => 'نویسنده', 'name' => 'writer'],
            ['label' => 'ویرایشگر', 'name' => 'editor'],
            ['label' => 'خریدار', 'name' => 'purchaser'],
            ['label' => 'حسابدار', 'name' => 'accounting'],
        ];
        $this->storeRoles($roles);
    }

    /**
     * @param array $roles
     * @return void
     */
    private static function storeRoles(array $roles): void
    {
        foreach ($roles as $role)
            Role::create($role);
    }
}
