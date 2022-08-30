<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'balance', 'customer_id', 'address1', 'address2',
        'city', 'state', 'zip'
    ];

    // insures the account balasnce has two decimal places
    protected $casts = ['balance' => 'decimal:2'];
    
    public function user() {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
