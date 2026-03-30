<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request)
{
    $request->validate([
        'email' => ['required', 'email'],
    ]);

    Password::sendResetLink($request->only('email'));

    return response()->json([
        'message' => "If an account is associated with that email, you'll receive a reset link shortly. Please also check your spam folder."
    ], 200);
}
}