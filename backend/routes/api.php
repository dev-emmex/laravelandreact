<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;


// =====================
// Auth Routes (Public)
// =====================

// Throttle to prevent brute force
Route::middleware(['check.origin', 'throttle:5,1'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Password reset
Route::middleware('check.origin')->group(function () {
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);
    Route::post('/reset-password', [ResetPasswordController::class, 'reset']);
});


// =====================
// Protected Routes
// =====================

Route::middleware(['token.cookie', 'auth:sanctum', 'check.origin'])->group(function () {

    // Auth
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Posts
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::post('/create-new-post', [PostController::class, 'createnewpost']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
});


// =====================
// Debug Routes (remove before going to production)
// =====================

Route::get('/debug-cookie', function (Request $request) {
    return response()->json([
        'has_cookie'           => $request->hasCookie('jwt'),
        'bearer_token'         => $request->bearerToken(),
        'all_cookies'          => $request->cookies->all(),
        'authorization_header' => $request->header('Authorization'),
        'user'                 => $request->user(),
    ]);
})->middleware('token.cookie');

Route::get('/debug-auth', function (Request $request) {
    return response()->json([
        'user'     => $request->user(),
        'token_id' => $request->user()?->currentAccessToken()?->id,
    ]);
})->middleware(['token.cookie', 'auth:sanctum']);