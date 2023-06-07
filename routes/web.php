<?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\UserStatusController;
use App\Http\Controllers\SecurityController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PrivacyController;
use App\Http\Controllers\BlockController;


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
    Route::get('/blocked-users', [BlockController::class, 'getBlockedUsers'])->name('block.users');

    Route::post('/unblock/post/{user}', [BlockController::class, 'unblock'])->name('user.unblock.post');


    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/security', [SecurityController::class, 'edit'])->name('security.edit');
    Route::get('/notification', [NotificationController::class, 'edit'])->name('notification.edit');
    Route::get('/privacy', [PrivacyController::class, 'edit'])->name('privacy.edit');
    Route::get('/block', [BlockController::class, 'edit'])->name('block.edit');



});

require __DIR__ . '/auth.php';


Route::get('/chat', [ChatController::class, 'index'])->middleware(['auth', 'verified'])->name('test');
Route::get('/getUsers', [ChatController::class, 'getUsers'])->name('chat.getUsers');
Route::get('/chat/messages/{id}', [ChatController::class, 'getMessages'])->name('chat.getMessages');
Route::get('/chat/user/lastMessage/{id}', [ChatController::class, 'getLastMessage'])->name('chat.getLastMessage');
Route::post('/chat/message/send', [MessageController::class, 'store'])->name('chat.sendMessage');
Route::post('/message/delete/{message}', [MessageController::class, 'destroy'])->name('message.delete');
