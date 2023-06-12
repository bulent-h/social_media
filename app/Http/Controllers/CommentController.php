<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CommentController extends Controller
{

    public function show(Post $post)  
{

    $comments = $post->comments()->with('user')->get();
    
    return response()->json($comments);
}


    public function store(Request $request, $postId)
    {
       
        $request->validate([
            'content' => 'required|max:255',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $post = Post::find($postId);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $comment = new Comment;
        $comment->user_id = Auth::id();
        $comment->post_id = $post->id;
        $comment->content = $request->content;
        $comment->parent_id = $request->filled('parent_id') ? $request->parent_id : null;       
        $comment->save();
        

        return response()->json($comment, 201);
    }

    public function destroy(Request $request, Comment $comment)
    {
        // Check if the authenticated user is the owner of the comment
        if ($comment->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'You are not allowed to delete this comment.');
        }

        $comment->delete();
        Log::info($comment);

        return redirect()->back()->with('message', 'Comment deleted!');
    }
}