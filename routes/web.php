<?php

use App\Http\Controllers\BlockController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\UserStatusController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::post('/logout', [ProfileController::class, 'logout'])->name('logout');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/users/{user}', [UserController::class, 'show'])->name('user.show');
    Route::post('/user/status', [UserStatusController::class, 'update'])->name('status.update');

    Route::get('/find-friends', [UserController::class, 'findFriends'])->name('find-friends');

    Route::post('/friendship/send/{user}', [FriendshipController::class, 'sendFriendRequest'])->name('sendFriendRequest');
    Route::post('/friendship/accept/{user}', [FriendshipController::class, 'acceptFriendRequest']);
    Route::post('/friendship/reject/{user}', [FriendshipController::class, 'rejectFriendRequest']);
    Route::post('/friendship/delete/{recipient}', [FriendshipController::class, 'destroy']);
    Route::delete('/friendship/remove/{user}', [FriendshipController::class, 'removeFriend']);

    Route::post('/block/{user}', [BlockController::class, 'block'])->name('user.block');
    Route::delete('/unblock/{user}', [BlockController::class, 'unblock'])->name('user.unblock');

});

require __DIR__ . '/auth.php';


Route::get('/chat', [ChatController::class, 'index'])->middleware(['auth', 'verified'])->name('test');
Route::get('/getUsers', [ChatController::class, 'getUsers'])->name('chat.getUsers');
Route::get('/chat/messages/{id}', [ChatController::class, 'getMessages'])->name('chat.getMessages');
Route::get('/chat/user/lastMessage/{id}', [ChatController::class, 'getLastMessage'])->name('chat.getLastMessage');
Route::post('/chat/message/send', [MessageController::class, 'store'])->name('chat.sendMessage');
