<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{
  public function show(User $user)
  {
    $authUser = auth()->user();
    $posts = $user->posts()
    ->with('polls.options.votes.user')
    ->withCount('comments') 
    ->get()
    ->map(function($post) use ($authUser) {
        $post->liked = $post->likes()->where('user_id', $authUser->id)->exists();
        return $post;
    });


        // Check if auth user has sent a friend request
        $authUserSentFriendRequest = DB::table('friendships')
            ->where('requester', $authUser->id)
            ->where('user_requested', $user->id)
            ->where('status', 0) // 0 for pending
            ->first() !== null;

        // Check if auth user has received a friend request from the user
        $authUserReceivedFriendRequest = DB::table('friendships')
            ->where('requester', $user->id)
            ->where('user_requested', $authUser->id)
            ->where('status', 0) // 0 for pending
            ->first() !== null;

        // Check if auth user is friends with the user
        $isFriends = DB::table('friendships')
            ->where(function ($query) use ($authUser, $user) {
                $query->where('requester', $authUser->id)
                    ->where('user_requested', $user->id)
                    ->where('status', 1); // 1 for accepted
            })
            ->orWhere(function ($query) use ($authUser, $user) {
                $query->where('requester', $user->id)
                    ->where('user_requested', $authUser->id)
                    ->where('status', 1); // 1 for accepted
            })
            ->first() !== null;

        // Check if the user has blocked the auth user
        $userHasBlockedAuthUser = Block::where('blocker_id', $user->id)
            ->where('blocked_id', $authUser->id)
            ->exists();

        if ($userHasBlockedAuthUser) {
            return Inertia::render('RestrictedAccess');
        }

        // Check if auth user has blocked the user
        $authUserHasBlocked = Block::where('blocker_id', $authUser->id)
            ->where('blocked_id', $user->id)
            ->exists();

    return Inertia::render('UserShow', [
      'user' => $user,
      'auth' => $authUser,
      'authUserSentFriendRequest' => $authUserSentFriendRequest,
      'authUserReceivedFriendRequest' => $authUserReceivedFriendRequest,
      'isFriends' => $isFriends,
      'authUserHasBlocked' => $authUserHasBlocked,
      'csrf' => csrf_token(),
    ]);
  }


    public function findFriends(Request $request)
    {
        $keyword = $request->input('keyword');
        $loggedInUserId = auth()->user()->id;

        $blockedUsersIds = Block::where('blocker_id', $loggedInUserId)
            ->orWhere('blocked_id', $loggedInUserId)
            ->pluck('blocked_id', 'blocker_id')
            ->toArray();

        $users = User::where('id', '!=', $loggedInUserId)
            ->whereNotIn('id', array_keys($blockedUsersIds))
            ->whereNotIn('id', array_values($blockedUsersIds))
            ->where(function ($query) use ($keyword) {
                $query->where('name', 'like', "%{$keyword}%")
                    ->orWhere('username', 'like', "%{$keyword}%");
            })
            ->get();

    return Inertia::render('FindFriends', [
      'users' => $users,
      'keyword' => $keyword,
    ]);
  }

    public function searchUsers(Request $request)
    {
        $query = $request->input('query');

        // $users = User::where('name', 'LIKE', '%' . $query . '%')->get();
        $users = User::whereNotExists(function ($query) {
            $query->select(DB::raw(1))
                ->from('blocks')
                ->whereColumn('blocks.blocked_id', 'users.id')
                ->orWhereColumn('blocks.blocker_id', 'users.id');
        })
            ->where('name', 'LIKE', '%' . $query . '%')
            ->get();
        return response()->json($users);
    }
    public function myProfile(Request $request )
    {
        // $this->show($request->user());
        return redirect()->route('user.show', [$request->user()]);
    }

}
