<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\Gateway;
use App\Models\Invoice;
use App\Models\Permission;
use App\Models\Plan;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->delete();
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $couponModelPermissions = [
            ['label' => 'مشاهده لیست کدتخفیف ها', 'name' => 'coupon_view_any', 'model' => Coupon::class],
            ['label' => 'مشاهده جزئیات کدتخفیف', 'name' => 'coupon_view', 'model' => Coupon::class],
            ['label' => 'افزودن کدتخفیف جدید', 'name' => 'coupon_create', 'model' => Coupon::class],
            ['label' => 'بروزرسانی کدتخفیف ها', 'name' => 'coupon_update', 'model' => Coupon::class],
            ['label' => 'حذف کدتخفیف ها', 'name' => 'coupon_delete', 'model' => Coupon::class],
        ];
        $this->storePermissions($couponModelPermissions);

        $couponModelPermissions = [
            ['label' => 'مشاهده لیست درگاه های پرداخت', 'name' => 'gateway_view_any', 'model' => Gateway::class],
            ['label' => 'مشاهده جزئیات درگاه پرداخت', 'name' => 'gateway_view', 'model' => Gateway::class],
            ['label' => 'افزودن درگاه پرداخت جدید', 'name' => 'gateway_create', 'model' => Gateway::class],
            ['label' => 'بروزرسانی درگاه های پرداخت', 'name' => 'gateway_update', 'model' => Gateway::class],
        ];
        $this->storePermissions($couponModelPermissions);

        $invoiceModelPermissions = [
            ['label' => 'مشاهده لیست فاکتور ها', 'name' => 'invoice_view_any', 'model' => Invoice::class],
            ['label' => 'مشاهده جزئیات فاکتور', 'name' => 'invoice_view', 'model' => Invoice::class],
            ['label' => 'افزودن فاکتور جدید', 'name' => 'invoice_create', 'model' => Invoice::class],
            ['label' => 'بروزرسانی فاکتور ها', 'name' => 'invoice_update', 'model' => Invoice::class],
            ['label' => 'حذف فاکتور ها', 'name' => 'invoice_delete', 'model' => Invoice::class],
        ];
        $this->storePermissions($invoiceModelPermissions);

        $invoiceModelPermissions = [
            ['label' => 'مشاهده لیست پلن ها', 'name' => 'plan_view_any', 'model' => Plan::class],
            ['label' => 'مشاهده جزئیات پلن', 'name' => 'plan_view', 'model' => Plan::class],
            ['label' => 'افزودن پلن جدید', 'name' => 'plan_create', 'model' => Plan::class],
            ['label' => 'بروزرسانی پلن ها', 'name' => 'plan_update', 'model' => Plan::class],
            ['label' => 'حذف پلن ها', 'name' => 'plan_delete', 'model' => Plan::class],
        ];
        $this->storePermissions($invoiceModelPermissions);

        $invoiceModelPermissions = [
            ['label' => 'مشاهده لیست نقش ها', 'name' => 'role_view_any', 'model' => Role::class],
            ['label' => 'مشاهده جزئیات نقش', 'name' => 'role_view', 'model' => Role::class],
            ['label' => 'افزودن نقش جدید', 'name' => 'role_create', 'model' => Role::class],
            ['label' => 'بروزرسانی نقش ها', 'name' => 'role_update', 'model' => Role::class],
            ['label' => 'حذف نقش ها', 'name' => 'role_delete', 'model' => Role::class],
        ];
        $this->storePermissions($invoiceModelPermissions);


        $userModelPermissions = [
            ['label' => 'مشاهده لیست کاربران', 'name' => 'user_view_any', 'model' => User::class],
            ['label' => 'مشاهده جزئیات کاربر', 'name' => 'user_view', 'model' => User::class],
            ['label' => 'ایجاد کاربر', 'name' => 'user_create', 'model' => User::class],
            ['label' => 'ویرایش کاربر', 'name' => 'user_update', 'model' => User::class],
            ['label' => 'حذف کاربر', 'name' => 'user_delete', 'model' => User::class],
            ['label' => 'تغیر نقش کاربران', 'name' => 'user_sync_role', 'model' => User::class],
            // ['label' => 'تغیر دسترسی کاربران', 'name' => 'user_sync_permission', 'model' => User::class],
        ];
        $this->storePermissions($userModelPermissions);

        
    }

    private function storePermissions(array $permissions)
    {
        foreach ($permissions as $permission)
            Permission::create($permission);
    }
}
