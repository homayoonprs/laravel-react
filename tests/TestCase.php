<?php

namespace Tests;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected User $actor;

    protected function setUp(): void {
        parent::setUp();
    }

    public function getActor() :User
    {
        return $this->actor;
    }

    public function setActor(Model $user): void
    {
        $this->actor = $user;
        $this->actingAs($this->actor);
    }

}
