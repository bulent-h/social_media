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

    public function friendsOfMine()
    {
        return $this->belongsToMany(User::class, 'friendships', 'requester', 'user_requested')
                    ->withPivot('status')
                    ->wherePivot('status', '=', 1)  // where status is Accepted
                    ->withTimestamps();
    }

    // who added me
    public function friendOf()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_requested', 'requester')
                    ->withPivot('status')
                    ->wherePivot('status', '=', 1)  // where status is Accepted
                    ->withTimestamps();
    }

    // accessor allowing you call $user->friends
    public function getFriendsAttribute()
    {
        if ( ! array_key_exists('friends', $this->relations)) $this->loadFriends();

        return $this->getRelation('friends');
    }

    protected function loadFriends()
    {
        if ( ! array_key_exists('friends', $this->relations))
        {
            $friends = $this->mergeFriends();

            $this->setRelation('friends', $friends);
        }
    }

    protected function mergeFriends()
    {
        if($temp = $this->friendsOfMine)
            return $temp->merge($this->friendOf);
        else
            return $this->friendOf;
    }

    public function addFriend(User $user)
    {
        $this->friendsOfMine()->attach($user->id);
    }

    // Accepting a friend request
    public function acceptFriend(User $user)
    {
        $this->friendRequests()->where('requester', $user->id)->first()->pivot
            ->update([
            'status' => 1,
        ]);
    }

    // Denying a friend request
    public function denyFriend(User $user)
    {
        $this->friendRequests()->where('requester', $user->id)->first()->pivot
            ->update([
            'status' => 2,
        ]);
    }

    // Removing a friend
    public function removeFriend(User $user)
    {
        $this->friendsOfMine()->detach($user->id);
        $this->friendOf()->detach($user->id);
    }

    // Check if user is friends with another user
    public function isFriendsWith(User $user)
    {
        return (bool) $this->friends()->where('id', $user->id)->count();
    }

    // Check if there's a pending friend request from another user
    public function hasPendingFriendRequestFrom(User $user)
    {
        return (bool) $this->friendRequests()->where('id', $user->id)->count();
    }

    // Check if a friend request has been sent to another user
    public function hasSentFriendRequestTo(User $user)
    {
        return (bool) $this->friendRequestsSent()->where('id', $user->id)->count();
    }


}
