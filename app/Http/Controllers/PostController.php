<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{

    public function store(Request $request)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Convert 'poll_options' back to array if 'type' is 'poll'
        if ($request->get('type') === 'poll' && !is_null($request->get('poll_options'))) {
            $request->merge([
                'poll_options' => json_decode($request->get('poll_options'), true)
            ]);
        }

        $validated = $request->validate([
            'type' => 'required|in:text,image,video,poll',
            'content' => 'nullable|string',
            'image_path' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'video_path' => 'nullable|file|mimes:mp4,mov,avi,flv,wmv|max:2048',
            'poll_question' => 'required_if:type,poll|string',
            'poll_options' => 'required_if:type,poll|array|min:2|max:5',
            'poll_options.*' => 'required_with:poll_options|string',
        ]);

        $post = new Post;
        $post->user_id = auth()->id();
        $post->type = $validated['type'];
        $post->content = $validated['content'] ?? null;

        if ($request->hasFile('image_path')) {
            // Generate a unique file name (using the current timestamp and the original file name)
            $fileName = time() . '_' . $request->file('image_path')->getClientOriginalName();

            // Move the file to the desired location and save the file's path in the database
            $filePath = $request->file('image_path')->storeAs('uploads', $fileName, 'public');
            $post->image_path = '/storage/' . $filePath;
        }

        if ($request->hasFile('video_path')) {
            // Generate a unique file name (using the current timestamp and the original file name)
            $fileName = time() . '_' . $request->file('video_path')->getClientOriginalName();

            // Move the file to the desired location and save the file's path in the database
            $filePath = $request->file('video_path')->storeAs('uploads', $fileName, 'public');
            $post->video_path = '/storage/' . $filePath;
        }

        $post->save();

        if ($validated['type'] === 'poll') {
            foreach ($validated['poll_options'] as $option) {
                $poll = new Poll();
                $poll->post_id = $post->id; // Attach the poll to the post we just created
                $poll->question = $validated['poll_question'];
                $poll->option = $option;
                $poll->save();
            }
        }

        return redirect()->route('home');

    }



    public function create()
    {
        return Inertia::render('CreatePost');
    }

}