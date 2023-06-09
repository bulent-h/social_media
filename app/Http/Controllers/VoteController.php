<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    /**
     * Store a newly created vote in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $postId
     * @param  int  $optionId
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $postId, $optionId)
    {
        // Get the poll id of the selected option
        $pollId = Option::find($optionId)->poll_id;

        // Check if the user has already voted on this poll
        $existingVote = Vote::where('user_id', Auth::id())
            ->whereHas('option', function ($query) use ($pollId) {
                $query->where('poll_id', $pollId);
            })
            ->first();

        // If the user has already voted on this poll, return an error response.
        if ($existingVote) {
            return response()->json(['error' => 'You have already voted on this poll'], 400);
        }

        // Record the new vote.
        $vote = new Vote;
        $vote->user_id = Auth::id();
        $vote->option_id = $optionId;
        $vote->save();

        // Return a successful response. You might want to redirect back to the post, or send a JSON response.
        return response()->json(['message' => 'Vote recorded successfully'], 200);

    }
}
