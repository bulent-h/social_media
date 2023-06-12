<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'content',
        'image_path',
        'video_path',
    ];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function poll() 
    {
        return $this->hasOne(Poll::class);
    }

    public function polls()
    {
        return $this->hasMany(Poll::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }
    public function comments() {
        return $this->hasMany(Comment::class);
    }
}
