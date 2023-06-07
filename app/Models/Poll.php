<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{

    protected $fillable = ['post_id', 'option', 'question'];
    
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

}