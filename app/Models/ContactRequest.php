<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactRequest extends Model
{
    protected $fillable = ['phone', 'name', 'email', 'business_name', 'service', 'message', 'source', 'is_read'];
}
