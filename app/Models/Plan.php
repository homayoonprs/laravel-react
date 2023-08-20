<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Plan extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'name',
        'description',
        'type',
        'days',
        'price',
        'free_days',
        'maximum_traffic_usage',
        'is_active',
        'random_username_prefix'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('plan')
            ->dontSubmitEmptyLogs();
    }

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active',true);
    }

    public function scopeDeactive(Builder $query): Builder
    {
        return $query->where('is_active',false);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }
}
