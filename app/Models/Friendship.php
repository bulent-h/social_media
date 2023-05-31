<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\User;

class Friendship extends Model
{
    protected $fillable = ['requester', 'user_requested', 'status'];

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester');
    }

    public function user_requested()
    {
        return $this->belongsTo(User::class, 'user_requested');
    }

    
}
