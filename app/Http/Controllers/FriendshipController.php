<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FriendshipController extends Controller
{
    public function sendFriendRequest(User $user)
    {
        // Get currently authenticated user
        $authUser = auth()->user();
        // Use the sendFriendRequest method from User model
        $authUser->sendFriendRequest($user);

        return redirect()->back();
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

    public function removeFriend(User $user)
    {
        $authUser = auth()->user();
        $authUser->removeFriend($user);

        return redirect()->back();
    }

    public function destroy(User $recipient)
    {
        // user cancels a friend request sent to recipient
        auth()->user()->deleteFriendRequest($recipient);

        return redirect()->back();
    }

}