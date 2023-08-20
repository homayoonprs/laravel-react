<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Gateway extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'name',
        'endpoint',
        'is_active',
        'for',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('gateway')
            ->dontSubmitEmptyLogs();
    }

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
