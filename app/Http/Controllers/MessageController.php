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
    public function index(): Response
    {
        // $user = User::find($request->user()->id);
        // $messages = $user->bothMessage($user->id,$id)->get();
        // return  $messages;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    // : RedirectResponse
    {

        $request->validate([
            'text' => ['required', 'string'],
            'file' => ['nullable', 'mimes:jpg,jpeg,png,gif', 'max:4096'],
        ]);


        $message = new Message;
        $message->sender_id=$request->user()->id;
        $message->receiver_id=(int)$request->receiver_id;
        $message->text_content=$request->text;


        if($request->hasFile('file')){

            $message->media_content_path = $request->file('file')->store('media','public');

        }
        $message->save();

        broadcast(new NewMessage($message));

        return $message;


    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Message $message): RedirectResponse
    // {
    //     $message=Message::where('id',$request->message_id)->get();


    //     if($request->user()->id == $message[0]->sender_id){
    //         $message[0]->delete();
    //         return "deletion done";
    //     }
    // }
}
