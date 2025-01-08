<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [PostController::class, 'index']);
Route::resource('posts', PostController::class)->except('index');
Route::get('login', [LoginController::class, 'create'])->name('login');
Route::post('login', [LoginController::class, 'store']);

Route::resource('users', UserController::class);
Route::middleware('auth')->group(function () {
    Route::post('logout', [LoginController::class, 'destroy']);
    Route::resource('comments', CommentController::class);
    Route::resource('tags', TagController::class);
});
