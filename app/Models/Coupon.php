<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Coupon extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'title',
        'description',
        'code',
        'public',
        'is_active',
        'amount',
        'minimum_purchase',
        'max_discount',
        'max_usage',
        'starts_at',
        'expire_at',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'expire_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active',true);
    }

    public function scopeDeactive(Builder $query): Builder
    {
        return $query->where('is_active',false);
    }

    public function scopePublic(Builder $query): Builder
    {
        return $query->where('public',true);
    }

    public function scopePrivate(Builder $query): Builder
    {
        return $query->where('public',false);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('coupon')
            ->dontSubmitEmptyLogs();
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function isExpired(): bool
    {
        return Carbon::parse($this->expire_at)->isPast();
    }

    public function isStarted(): bool
    {
        return Carbon::parse($this->starts_at)->isPast();
    }

    public function belongsToUser(User $user): bool
    {
        return $this->users()->where('id', $user->id)->get()->isNotEmpty();
    }

    public function isUsageLimitExceeded(User $user): bool
    {
        return $user->invoices()->whereHas('coupon')->count() >= $this->max_usage;
    }
}
