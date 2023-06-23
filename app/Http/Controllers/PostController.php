<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Poll;
use App\Models\Post;
use App\Models\Like;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PostController extends Controller
{


    public function store(Request $request)
    {
        // $file = $request->file('video_path');
        // return $file->getMimeType();

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
            'image_path' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:20000',
            'video_path' => 'mimes:mp4,mov,ogg,qt,mkv,mks,mk3d| max:20000',
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

    public function vote(Request $request, $postId, $optionId)
    {
        // Find option by its ID and increment votes
        $option = Option::find($optionId);
        $option->increment('votes');

        // Create a new vote
        $vote = new Vote;
        $vote->user_id = Auth::id();
        $vote->option_id = $optionId;
        $vote->save();

        // Find the post with its related options and votes
        $post = Post::with('polls.options.votes.user')->find($postId);

        $user = Auth::user();
        return response()->json(['post' => $post, 'user' => $user]);

    }

    public function toggleLike(Post $post)
    {
        $user = Auth::user();
        $like = $user->likes()->where('post_id', $post->id)->first();

        if ($like) {
            $like->delete();
            $post->decrement('likes_count');
        } else {
            $like = new Like();
            $like->user_id = $user->id;
            $like->post_id = $post->id;
            $like->save();
            $post->increment('likes_count');
        }


        // Check if the post is liked by the user after the toggle
        $post->liked = $post->likes()->where('user_id', $user->id)->exists();



        return response()->json(['post' => $post]);
    }

    public function destroy($postId)
    {
        $post = Post::find($postId);

        if ($post) {
            $post->delete();
        } else {
            return back()->withErrors(['post_not_found' => 'Could not find the post to delete.']);
        }

        return redirect()->back();
    }






}