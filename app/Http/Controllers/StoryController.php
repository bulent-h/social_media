<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('stories')->get();

        return response()->json($users);
    }
    public function viewUserStory(Request $request)
    {
        $user = User::findOrFail($request->user);
        $stories = $user->stories;

        // return response()->json($stories);
        // return User::find($request->user);
        return Inertia::render('Story/ViewStory', ['stories' => $stories, 'user' => $user]);
    }
    public function show(Request $request)
    {
        $user = User::findOrFail($request->user);
        $story = Story::findOrFail($request->story);
        $stories = $user->stories;

        return Inertia::render(
            'Story/ViewStory',
            [
                'stories' => $stories,
                'user' => $user,
                'story' => $story
            ]
        );
    }

    // ...
    public function create(Request $request)
    {
        return Inertia::render('Story/CreateStory');

    }

    public function store(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'content' => 'nullable|string',
            'file' => 'nullable|file|max:2048|mimes:jpeg,jpg,png,gif,mp4,webm',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Handle media upload
        $mediaUrl = null;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $mediaUrl = $file->store('story', 'public');

        }
        // Create a new story
        $story = new Story();
        $story->content = $request->input('content');
        $story->media_url = $mediaUrl;
        $story->media_type = $request->input('type');
        $story->user_id = $request->user()->id;
        $story->save();

        return response()->json($story, 201);
    }

    public function update(Request $request, $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'content' => 'required|string',
            'media' => 'nullable|file|max:2048|mimes:jpeg,jpg,png,gif,mp4,webm',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update an existing story
        $story = Story::findOrFail($id);
        $story->title = $request->input('title');
        $story->content = $request->input('content');

        // Handle media upload
        if ($request->hasFile('media')) {
            // Delete the previous media file
            if ($story->media_url) {
                Storage::delete($story->media_url);
            }

            $file = $request->file('media');
            $mediaUrl = $file->store('public/media');
            $story->media_url = $mediaUrl;
        }

        $story->save();

        return response()->json($story);
    }

    public function destroy(Story $story)
    {
        //
    }
}
