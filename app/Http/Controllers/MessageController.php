<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Events\NewMessage;

class MessageController extends Controller
{
    public function index()
    {
        // $user = User::find($request->user()->id);
        // $messages = $user->bothMessage($user->id,$id)->get();
        // return  $messages;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'text' => ['required', 'string'],
            'file' => ['nullable', 'mimes:jpg,jpeg,png,gif', 'max:4096'],
        ]);


        $message = new Message;
        $message->sender_id = $request->user()->id;
        $message->receiver_id = (int) $request->receiver_id;
        $message->text_content = $request->text;
        $message->parent_id = $request->parent_id;


        if ($request->hasFile('file')) {

            $message->media_content_path = $request->file('file')->store('media', 'public');

        }
        $message->save();

        broadcast(new NewMessage($message));

        return $message;


    }
    public function reply(Request $request, Message $message)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'text' => ['required', 'string'],
            'file' => ['nullable', 'mimes:jpg,jpeg,png,gif', 'max:4096'],
        ]);


        // Save the reply message to the database
        $reply = new Message();
        $reply->sender_id = $request->user()->id;
        $reply->receiver_id = (int) $request->receiver_id;
        $reply->text_content = $validatedData['text'];
        $reply->parent_id = $message->id;
        $reply->save();

        // Return a response indicating the success or failure of the operation
        return response()->json(['message' => 'Reply sent successfully']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,Message $message)
    {
        // $message=Message::where('id',$request->message_id)->get();
        // return $message;

        if ($request->user()->id == $message['sender_id']) {
            $message->delete();
            return $message;

        }
    }
}
