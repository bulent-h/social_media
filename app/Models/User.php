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
use Illuminate\Validation\Rule;

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
        'username',
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





    public function sentMessage()
    {
        return $this->hasMany(Message::class, 'sender_user_id', 'id');
    }

    public function receivedMessage()
    {
        return $this->hasMany(Message::class, 'receiver_user_id', 'id');
    }
    public function bothMessage($sender_id, $receiver_id)
    {
        // return $users = DB::table('messages')
        //             ->where('sender_user_id', $sender_id)
        //             ->Where('receiver_user_id', $receiver_id);

        return $users = DB::table('messages')
            ->where([['sender_user_id', $sender_id,], ['receiver_user_id', $receiver_id]])
            ->orWhere([['sender_user_id', $receiver_id], ['receiver_user_id', $sender_id]]);

    }

    public function friendRequestsSent()
    {
        return $this->belongsToMany(User::class, 'friendships', 'requester', 'user_requested')
            ->withPivot('status')
            ->wherePivot('status', '=', 0) // where status is pending
            ->withTimestamps()
            ->as('friendship'); // Add an alias to the pivot table
    }

    public function friendRequestsReceived()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_requested', 'requester')
            ->withPivot('status')
            ->wherePivot('status', '=', 0) // where status is pending
            ->withTimestamps();
    }

    public function friendsOfMine()
    {
        return $this->belongsToMany(User::class, 'friendships', 'requester', 'user_requested')
            ->withPivot('status')
            ->wherePivot('status', '=', 1) // where status is Accepted
            ->withTimestamps();
    }

    // who added me
    public function friendOf()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_requested', 'requester')
            ->withPivot('status')
            ->wherePivot('status', '=', 1) // where status is Accepted
            ->withTimestamps();
    }

    // accessor allowing you call $user->friends
    public function getFriendsAttribute()
    {
        if (!array_key_exists('friends', $this->relations))
            $this->loadFriends();

        return $this->getRelation('friends');
    }

    protected function loadFriends()
    {
        if (!array_key_exists('friends', $this->relations)) {
            $friends = $this->mergeFriends();

            $this->setRelation('friends', $friends);
        }
    }

    protected function mergeFriends()
    {
        if ($temp = $this->friendsOfMine)
            return $temp->merge($this->friendOf);
        else
            return $this->friendOf;
    }

    public function addFriend(User $user)
    {
        $this->friendsOfMine()->attach($user->id);
    }

    public function sendFriendRequest(User $user)
    {
        $this->friendRequestsSent()->attach($user->id);
    }

    public function acceptFriendRequest(User $user)
    {
        $this->friendRequestsSent()->updateExistingPivot($user->id, ['status' => 1]);
    }

    public function rejectFriendRequest(User $user)
    {
        $this->friendRequestsReceived()->detach($user->id);
    }

    public function removeFriend(User $user)
    {
        $this->friendsOfMine()->detach($user->id);
        $this->friendOf()->detach($user->id);
    }


    public function isFriendsWith(User $user)
    {
        return (bool) $this->friends()->where('id', $user->id)->count();
    }

    public function hasPendingFriendRequestFrom(User $user)
    {
        return (bool) $this->friendRequests()->where('id', $user->id)->count();
    }

    public function hasSentFriendRequestTo(User $user)
    {
        return (bool) $this->friendRequestsSent()
            ->where('user_requested', $user->id)
            ->count();
    }


    public function deleteFriendRequest(User $user)
    {
        $this->friendRequestsSent()->detach($user->id);
    }

    public function destroyFriendRequest(User $user)
    {
        $authUser = auth()->user();
        $authUser->deleteFriendRequest($user);
        return redirect()->back();
    }


}