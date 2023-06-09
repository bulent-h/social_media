<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Poll;
use App\Models\Post;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            
            $originalName = $request->file('image_path')->getClientOriginalName();
            $originalNameWithoutSpaces = str_replace(' ', '_', $originalName); 
            $fileName = time() . '_' . $originalNameWithoutSpaces;
        
            
            $filePath = $request->file('image_path')->storeAs('uploads', $fileName, 'public');
            $post->image_path = $filePath;
        }
        

        if ($request->hasFile('video_path')) {
            
            $originalName = $request->file('video_path')->getClientOriginalName();
            $originalNameWithoutSpaces = str_replace(' ', '_', $originalName); 
            $fileName = time() . '_' . $originalNameWithoutSpaces;

            
            $filePath = $request->file('video_path')->storeAs('uploads', $fileName, 'public');
            $post->video_path = $filePath;
        }

        $post->save();

        if ($validated['type'] === 'poll') {
            $poll = new Poll();
            $poll->post_id = $post->id; // Attach the poll to the post we just created
            $poll->question = $validated['poll_question'];
            $poll->save();
        
            foreach ($validated['poll_options'] as $option) {
                $pollOption = new Option();
                $pollOption->poll_id = $poll->id;
                $pollOption->text = $option;
                $pollOption->save();
            }
        }
        

        return redirect()->route('home');

    }


    public function create()
    {
        return Inertia::render('CreatePost');
    }

}