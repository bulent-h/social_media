<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Settings/Notification/Edit');
    }

}
