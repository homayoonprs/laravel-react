<?php

namespace App\Models;

use App\Models\Radius\RadAcct;
use App\Models\Radius\RadCheck;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Account extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'username',
        'password',
        'is_active',
        'user_id',
        'plan_id',
        'transaction_id',
        'maximum_traffic_usage',
        'used_traffic',
        'is_overflow',
        'starts_at',
        'expire_at',
    ];

    protected $casts = [
        'starts_at'   => 'datetime',
        'expire_at'   => 'datetime',
        'is_active'   => 'boolean',
        'is_overflow' => 'boolean',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('account')
            ->dontSubmitEmptyLogs();
    }

    public static function generateUsername(string $prefix,string|int $userID): string
    {
        do {
            $prefix = $prefix . ($userID + 9 * 2);
            $randomNumber = rand(100, 999);
            $username = $prefix . $randomNumber;
        } while (Account::where('username', $username)->first() != null);

        return $username;
    }

    public function user() :BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan() :BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function transaction() :HasOne
    {
        return $this->hasOne(Transaction::class);
    }

    public function radCheck() :RadCheck|null
    {
        return RadCheck::where('username', $this->username)->where('attribute', 'Cleartext-Password')->first();
    }

    public function radAccts() :Collection
    {
        return RadAcct::where('username', $this->username)->get();
    }
}
