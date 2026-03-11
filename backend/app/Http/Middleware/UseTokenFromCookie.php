<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class UseTokenFromCookie
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->bearerToken() && $request->hasCookie('jwt')) {
            try{
                $token = $request->cookie('jwt');

                if ($token) {
                    $request->headers->set('Authorization', 'Bearer '.$token);
                }
            } catch (\Exception $e) {
                // Log the error 
                \Log::error('Cookie decryption failed: '.$e->getMessage());
            }
        }

        return $next($request);
    }
}