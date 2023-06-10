<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'media_url', 'media_type'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
