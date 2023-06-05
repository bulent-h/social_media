<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
use App\Models\User;
use Illuminate\Http\Request;

class FriendshipController extends Controller
{
    public function sendFriendRequest(User $user)
{
    $authUser = auth()->user();

    // Add check if auth user has blocked the other user
    if(!$authUser->isBlocking($user)) {
        $authUser->sendFriendRequest($user);
        return redirect()->back();
    }
    // Redirect with error message if the user is blocked
    return redirect()->back()->withErrors(['block' => 'You have blocked this user.']);
}


    public function acceptFriendRequest(User $user)
    {
        $authUser = auth()->user();
        $authUser->acceptFriendRequest($user);
        return redirect()->back();
    }

    public function rejectFriendRequest(User $user)
    {
        $authUser = auth()->user();
        $authUser->rejectFriendRequest($user);
        return redirect()->back();
    }

    public function removeFriend(Request $request, $user_requested)
{
    $user = User::findOrFail($user_requested);
    
    // Delete the friendship where either requester = auth.id and user_requested = user.id 
    // OR requester = user.id and user_requested = auth.id
    Friendship::where([
        ['requester', '=', $request->user()->id],
        ['user_requested', '=', $user->id]
    ])->orWhere([
        ['requester', '=', $user->id],
        ['user_requested', '=', $request->user()->id]
    ])->delete();

    return back()->with('status', 'Friendship removed.');
}


    public function destroy(User $recipient)
    {
        // user cancels a friend request sent to recipient
        auth()->user()->deleteFriendRequest($recipient);

        return redirect()->back();
    }
}