<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlockController extends Controller
{
    public function block(User $user)
    {
        auth()->user()->block($user);

        return redirect()->back();
    }

    public function unblock(User $user)
    {
        auth()->user()->unblock($user);

        return redirect()->back();
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Settings/Block/Edit');
    }
    public function getBlockedUsers(Request $request)
    {

        $blockedUsers = $request->user()->blocks()->with('blocked')->get();

        return $blockedUsers;
    }


}
