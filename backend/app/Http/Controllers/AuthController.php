<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;


class AuthController extends Controller
{

    /**
     * Register a new user.
     * Uses Form Request for proper validation.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $user = User::create([
                'name' => $request->validated('name'),
                'email' => $request->validated('email'),
                'password' => Hash::make($request->validated('password')),
            ]);

            // Generate token for the newly registered user
            $token = $user->createToken('auth-token')->plainTextToken;

            $cookie = cookie(
                name: 'jwt',
                value: $token,
                minutes: 60 * 24,
                path: '/',
                domain: null,
                secure: false, // Allow in non-HTTPS for local development
                httpOnly: true,
                sameSite: 'Lax'
            );

            return response()->json([
                'message' => 'User registered successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ], Response::HTTP_CREATED)->withCookie($cookie);

        } catch (\Illuminate\Database\QueryException $e) {
            // Handle database errors gracefully
            return response()->json([
                'message' => 'Registration failed. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Authenticate user and generate JWT token.
     * Uses Form Request for proper validation.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = [
            'email' => $request->validated('email'),
            'password' => $request->validated('password'),
        ];


        if (!Auth::attempt($credentials)) {
            // Generic error message to prevent information disclosure
            return response()->json([
                'message' => 'Invalid credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        /** @var User $user */
        $user = Auth::user();

        // Revoke existing tokens (optional - for security)
        $user->tokens()->delete();

        $token = $user->createToken('auth-token')->plainTextToken;

        $cookie = cookie(
            name: 'jwt',
            value: $token,
            minutes: 60 * 24,
            path: '/',
            domain: null,
            secure: false, // Allow in non-HTTPS for local development
            httpOnly: true,
            sameSite: 'Lax'
        );

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ])->withCookie($cookie);
    }

    /**
     * Get the authenticated user.
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Logout the authenticated user.
     */
    public function logout(Request $request): JsonResponse
    {
        // Delete the current token
        $request->user()->currentAccessToken()->delete();

        $cookie = cookie('jwt', '', -60); // Expire the cookie

        return response()->json([
            'message' => 'Logged out successfully',
        ])->withCookie($cookie);
    }
}

