<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Message;

use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        return $this->hasMany(Message::class, 'sender_id', 'id');
    }

    public function receivedMessage()
    {
        return $this->hasMany(Message::class, 'receiver_id', 'id');
    }
    public function bothMessage($sender_id, $receiver_id)
    {

        // return $messages = DB::table('messages')
        //         ->where([['sender_id', $sender_id,],['receiver_id', $receiver_id]])
        //         ->orWhere([['sender_id', $receiver_id],['receiver_id',  $sender_id]]);


        $senderId = $sender_id; // Replace with the actual sender's ID
        $receiverId = $receiver_id; // Replace with the actual receiver's ID

        $messages = Message::with('parent')
            ->where(function ($query) use ($senderId, $receiverId) {
                $query->where('sender_id', $senderId)
                    ->where('receiver_id', $receiverId);
            })
            ->orWhere(function ($query) use ($senderId, $receiverId) {
                $query->where('sender_id', $receiverId)
                    ->where('receiver_id', $senderId);
            })
            ->get();

        return $messages;
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
    public function getAllFriends($userId){
        $mergedFriends = collect([]);
        $friends = Friendship::select('user_requested', 'requester')
            ->where('status', 1)
            ->where(function ($query) use ($userId) {
                $query->where('requester', $userId)
                    ->orWhere('user_requested', $userId);
            })
            ->get();

        $friends->each(function ($friend) use ($mergedFriends) {
            $mergedFriends->push($friend->user_requested);
            $mergedFriends->push($friend->requester);
        });
        $mergedFriends = collect($mergedFriends)->reject(function ($friendId) use ($userId) {
            return $friendId == $userId;
        })->values()->all();
        // $userModels = User::whereIn('id', $mergedFriends)->get();
        return $mergedFriends;

    }

    public function addFriend(User $user)
    {
        $this->friendRequestsSent()->attach($user->id, ['status' => 1]);
    }

    public function sendFriendRequest(User $user)
    {
        // Add check if this user has blocked the other user
        if (!$this->isBlocking($user)) {
            $this->friendRequestsSent()->attach($user->id, ['status' => 0]);
        }
        // You could add an else clause here to return an error if needed
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

    /*{blocking}*/
    public function blocks()
    {
        return $this->hasMany(Block::class, 'blocker_id');
    }

    public function block(User $user)
    {
        return $this->blocks()->create(['blocked_id' => $user->id]);
    }

    public function unblock(User $user)
    {
        return $this->blocks()->where('blocked_id', $user->id)->delete();
    }

    public function isBlocking(User $user)
    {
        return $this->blocks()->where('blocked_id', $user->id)->exists();
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }



    public function stories()
    {
        return $this->hasMany(Story::class);
    }

}
