<?php

namespace Tests\Feature\API\Admin;

use Tests\Feature\API\Base\InvoiceTestBase;
use App\Models\Account;
use App\Models\Invoice;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class InvoiceTest extends InvoiceTestBase
{
    // use RefreshDatabase;

    private string $endpoint = '/api/v1/admin/invoices';

    protected function setUp(): void
    {
        parent::setUp();
        $this->setActor(User::factory()->create());
    }
    
    /** @test */
    public function can_create_account_and_transaction_for_invoice()
    {
        $account = Account::factory()->make()->toArray();
        $transaction = Transaction::factory()->make()->toArray();
        $data = [...$account, ...$transaction];
        $this->postJson($this->endpoint . '/add-item', $data)
        ->dd()
            ->assertSuccessful()
            ->assertJsonStructure($this->invoiceResourceJsonStructure());
    }

}
