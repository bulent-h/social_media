<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\CanResetPassword;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function sentMessage(){
        return $this->hasMany(Message::class,'sender_user_id','id');
    }

    public function receivedMessage(){
        return $this->hasMany(Message::class,'receiver_user_id' ,'id');
    }
    public function bothMessage($sender_id,$receiver_id){
        // return $users = DB::table('messages')
        //             ->where('sender_user_id', $sender_id)
        //             ->Where('receiver_user_id', $receiver_id);

        return $users = DB::table('messages')
                ->where([['sender_user_id', $sender_id,],['receiver_user_id', $receiver_id]])
                ->orWhere([['sender_user_id', $receiver_id],['receiver_user_id',  $sender_id]]);

    }


}
