<?php

use Illuminate\Support\Facades\Route;

// Admin Controllers
use App\Http\Controllers\API\Admin\AccountController;
use App\Http\Controllers\API\Admin\CouponController;
use App\Http\Controllers\API\Admin\GatewayController;
use App\Http\Controllers\API\Admin\InvoiceController;
use App\Http\Controllers\API\Admin\PlanController;
use App\Http\Controllers\API\Admin\TransactionController;
use App\Http\Controllers\API\Admin\UserController;
use App\Http\Controllers\API\Admin\PermissionController;
use App\Http\Controllers\API\Admin\RoleController;

// Client Controllers
use App\Http\Controllers\API\Client\AccountController as ClientAccountController;
use App\Http\Controllers\API\Client\CouponController as ClientCouponController;
use App\Http\Controllers\API\Client\InvoiceController as ClientInvoiceController;
use App\Http\Controllers\API\Client\ProfileController as ClientProfileController;

// Public Controllers
use App\Http\Controllers\API\General\PlanController as PublicPlanController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->prefix('v1')->group(function () {

    Route::get('/me', [UserController::class, 'getMe'])->name('user.me');

    // Admin Routes
    Route::prefix('admin')->name('.admin')->group(function (){

        Route::apiResource('accounts', AccountController::class);
        Route::post('/accounts/generate-username', [AccountController::class, 'generateAccountUsername'])->name('account.generateUsername');

        Route::apiResource('coupons', CouponController::class);
        Route::post('/coupons/attach-to-invoice/{invoice}',[CouponController::class,'attachCouponToInvoice'])->name('coupon.attachToInvoice');
        Route::post('/coupons/detach-from-invoice/{invoice}',[CouponController::class,'detachCouponFromInvoice'])->name('coupon.detachFromInvoice');

        Route::apiResource('gateways', GatewayController::class);

        Route::apiResource('invoices', InvoiceController::class);
        Route::post('invoices/add-item', [InvoiceController::class, 'createAccountAndTransactionForInvoice'])->name('invoice.storingAccountAndTransactionForInvoice');
        Route::delete('invoices/remove-item/{transaction}/{account}', [InvoiceController::class, 'removeAccountAndTransactionFromInvoice'])->name('invoice.removingAccountAndTransactionFromInvoice');
        Route::put('invoices/update-item/{transaction}/{account}', [InvoiceController::class, 'updateAccountAndTransactionOfInvoice'])->name('invoice.updatingAccountAndTransactionOfInvoice');

        Route::apiResource('plans', PlanController::class);

        Route::apiResource('transactions', TransactionController::class);
        
        Route::apiResource('users',UserController::class);
        Route::post('users/{user}/sync/roles', [UserController::class, 'syncRoles'])->name('user.sync.roles');
        Route::post('users/{user}/sync/permissions', [UserController::class, 'syncPermissions'])->name('user.sync.permissions');

        Route::apiResource('roles', RoleController::class);
        Route::post('roles/{role}/sync/permissions', [RoleController::class, 'syncPermissions'])->name('role.sync.permissions');
        Route::post('users/{user}/sync/roles', [UserController::class, 'syncRoles'])->name('user.sync.roles');

        Route::get('permissions', [PermissionController::class, 'index'])->name('permission.index');

    });

    // Client Routes
    Route::prefix('/client')->name('.client')->group(function () {

        Route::apiResource('/accounts', ClientAccountController::class)->only(['index']);

        Route::apiResource('/coupons', ClientCouponController::class)->only(['index']);
        Route::post('/coupons/attach-to-invoice/{invoice}',[ClientCouponController::class,'attachCouponToInvoice'])->name('coupon.attachToInvoice');
        Route::post('/coupons/detach-from-invoice/{invoice}',[ClientCouponController::class,'detachCouponFromInvoice'])->name('coupon.detachFromInvoice');

        Route::apiResource('invoices', ClientInvoiceController::class)->only(['index']);
        Route::get('/invoice/get-open-invoice', [ClientInvoiceController::class, 'getOpeninvoice'])->name('invoice.getOpenInvoice');
        Route::post('/invoices/add-item/{plan}', [ClientInvoiceController::class, 'addPlanToInvoice'])->name('invoice.addPlanToInvoice');
        Route::delete('/invoices/remove-item/{plan}', [ClientInvoiceController::class, 'removePlanFromInvoice'])->name('invoice.removePlanFromInvoice');

        Route::put('/my-profile', [ClientProfileController::class, 'updateMyprofile'])->name('me.updateProfile');
    });

});

// Public Route List
Route::prefix('v1')->name('.public')->group(function () {

    Route::apiResource('plans', PublicPlanController::class)->only(['index', 'show']);
    Route::post('/plans/create-first-invoice', [PublicPlanController::class, 'storeInvoice'])->name('plan.createFirstInvoice');
    
});
