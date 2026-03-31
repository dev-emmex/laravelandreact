<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckOrigin
{
    protected $allowedOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:8000',
    ];

    public function handle(Request $request, Closure $next)
    {
        $origin = $request->header('Origin') ?? $request->header('Referer');

        // Allow if origin matches
        $isAllowed = collect($this->allowedOrigins)->contains(function ($allowed) use ($origin) {
            return str_starts_with($origin, $allowed);
        });

        if (!$isAllowed) {
            return response()->json([
                'message' => 'Unauthorized request origin.'
            ], 403);
        }

        return $next($request);
    }
}