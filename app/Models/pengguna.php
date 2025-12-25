<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use illuminate\Database\Eloquent\Factories\HasFactory;

class pengguna extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'email',
        'password',
        'no_hp',
    ];
}
