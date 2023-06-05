<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\UserStatusUpdated;

class UserStatusController extends Controller
{
    public function update(Request $request)
    {

        $user = $request->user();
        $status = $request->input('status');

        // Update the user's status
        $user->status = $status;
        $user->save();
        // Trigger an event to notify other clients about the status change
        broadcast(new UserStatusUpdated($user));

        return response()->json(['message' => 'User status updated successfully']);
    }


}
