<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['name', 'username', 'email', 'password'];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sentMessage()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessage()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function bothMessage()
    {
        return $this->sentMessage->concat($this->receivedMessage);
    }

    public function friendRequestsSent()
    {
        return $this->belongsToMany(User::class, 'friendships', 'requester', 'user_requested')
            ->withPivot('status')
            ->wherePivot('status', '=', 0) // where status is pending
            ->withTimestamps();
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

    public function friendOf()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_requested', 'requester')
            ->withPivot('status')
            ->wherePivot('status', '=', 1) // where status is Accepted
            ->withTimestamps();
    }

    public function addFriend(User $user)
    {
        $this->friendRequestsSent()->attach($user->id, ['status' => 1]);
    }

    public function sendFriendRequest(User $user)
    {
        $this->friendRequestsSent()->attach($user->id, ['status' => 0]);
    }

    public function acceptFriendRequest(User $user)
    {
        $this->friendRequestsReceived()->updateExistingPivot($user->id, ['status' => 1]);
    }

    public function rejectFriendRequest(User $sender)
    {
        $this->friendRequestsReceived()->detach($sender->id);
    }

    public function removeFriend(User $user)
    {
        $this->friendRequestsSent()->detach($user->id);
        $this->friendRequestsReceived()->detach($user->id);
    }

    public function isFriendsWith(User $user)
    {
        return $this->friendsOfMine->contains($user) || $this->friendOf->contains($user);
    }

    public function hasPendingFriendRequestFrom(User $sender)
    {
        return (bool) $this->friendRequestsReceived()->where('sender_id', $sender->id)->count();
    }

    public function hasSentFriendRequestTo(User $recipient)
    {
        return (bool) $this->friendRequestsSent()->where('receiver_id', $recipient->id)->count();
    }

    public function deleteFriendRequest(User $recipient)
    {
        $this->friendRequestsSent()->detach($recipient->id);
    }
}
