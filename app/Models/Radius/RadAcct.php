<?php

namespace App\Models\Radius;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RadAcct extends Model
{
    use HasFactory;

    protected $connection = 'radius_mysql';

    protected $table = 'radacct';
    
    public $timestamps = false;account

    protected $fillable = [
        'username',
        'acctinputoctets',
        'acctoutputoctets'
    ];
}
