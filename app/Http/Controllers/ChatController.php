<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Message;


class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(){
        return Inertia::render('Chat');
    }

    public function getMessages(Request $request,$id)
    {

        $user = User::find($request->user()->id);
        $messages = $user->bothMessage($user->id,$id)->get();

        return  $messages;
    }

    public function getUsers(){
        $users=User::all();
        // dd($users->setVisible(['id', 'name']));
        return $users->setVisible(['id', 'name']) ;
    }

    public function getLastMessage(Request $request ,$id)
    {
        $user = User::find($request->user()->id);
        $messageId = $user->bothMessage($user->id,$id)->max('id');
        $lastMessage=Message::find($messageId);
        return  $lastMessage;
    }


}
