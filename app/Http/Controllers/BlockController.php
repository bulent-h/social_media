<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
}

