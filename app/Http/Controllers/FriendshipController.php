<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FriendshipController extends Controller
{

    public function getFriendRequests()
    {
        $userId = auth()->user()->id;

        $friendRequests = Friendship::where('user_requested', $userId)
            ->where('status', 0)
            ->get()
            ->map(function ($friendship) {
                $requester = User::find($friendship->requester);

                return [
                    'id' => $requester->id,
                    'name' => $requester->name,
                    'username' => $requester->username,
                    'avatar' => $requester->avatar,
                ];
            });
        return response()->json($friendRequests);
    }
    public function showFriends()
    {

        $userId = auth()->user()->id;

        $friends = Friendship::where(function ($query) use ($userId) {
            $query->where('requester', $userId)
                ->orWhere('user_requested', $userId);
        })->where('status', 1)
            ->get()
            ->map(function ($friendship) use ($userId) {
                if ($friendship->requester === $userId) {
                    $friendId = $friendship->user_requested;
                } else {
                    $friendId = $friendship->requester;
                }

                $friend = User::find($friendId);

                return [
                    'id' => $friend->id,
                    'name' => $friend->name,
                    'username' => $friend->username,
                    'avatar' => $friend->avatar,
                ];
            });

        return Inertia::render('MyFriends', [
            'friends' => $friends,
        ]);
    }
    public function getFriends()
    {

        $userId = auth()->user()->id;

        $friends = Friendship::where(function ($query) use ($userId) {
            $query->where('requester', $userId)
                ->orWhere('user_requested', $userId);
        })->where('status', 1)
            ->get()
            ->map(function ($friendship) use ($userId) {
                if ($friendship->requester === $userId) {
                    $friendId = $friendship->user_requested;
                } else {
                    $friendId = $friendship->requester;
                }

                $friend = User::find($friendId);

                return [
                    'id' => $friend->id,
                    'name' => $friend->name,
                    'username' => $friend->username,
                    'avatar' => $friend->avatar,
                    'status' => $friend->status
                ];
            });

        return ['friends' => $friends];
    }

    public function sendFriendRequest(User $user)
    {
        $authUser = auth()->user();

        // Add check if auth user has blocked the other user
        if (!$authUser->isBlocking($user)) {
            $authUser->sendFriendRequest($user);
            return redirect()->back();
        }
        // Redirect with error message if the user is blocked
        return redirect()->back()->withErrors(['block' => 'You have blocked this user.']);
    }

    public function removeFriend(Request $request, $user_requested)
    {
        $user = User::findOrFail($user_requested);
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

    public function getFriendsPosts()
    {
        $userId = auth()->user()->id;

        // Get the list of friend IDs
        $friendships = Friendship::where(function ($query) use ($userId) {
            $query->where('requester', $userId)
                ->orWhere('user_requested', $userId);
        })->where('status', 1)
            ->get();

        $friendIds = $friendships->map(function ($friendship) use ($userId) {
            return $friendship->requester === $userId ? $friendship->user_requested : $friendship->requester;
        });

        // Add the authenticated user's ID to the list
        $friendIds[] = $userId;

        // Fetch the posts of the friends and the authenticated user
        $posts = Post::whereIn('user_id', $friendIds)
            ->with([
                'user',
                'polls.options.votes.user' // Eager load polls, options and votes
            ])
            ->withCount('comments')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($post) {
                return [
                    'post' => $post,
                    'user' => [
                        'id' => $post->user->id,
                        'name' => $post->user->name,
                        'username' => $post->user->username,
                        'avatar' => $post->user->avatar,
                    ],
                ];
            });

        return ['posts' => $posts];
    }




}