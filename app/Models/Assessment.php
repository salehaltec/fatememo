<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = ['phone', 'tool', 'business_name', 'business_type', 'answers', 'result', 'verified_at'];

    protected function casts(): array
    {
        return ['answers' => 'array', 'result' => 'array', 'verified_at' => 'datetime'];
    }
}
