<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Notifications\Auth\ResetPasswordNotification;


class User extends Authenticatable implements CanResetPasswordContract
{
    use HasFactory, Notifiable, HasApiTokens, CanResetPassword;

   
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password', 
        'remember_token',   
    ];
        
    public function sendPasswordResetNotification($token): void
{
    $resetUrl = config('app.frontend_url')
        . '/reset-password?token=' . $token
        . '&email=' . urlencode($this->email);

    $this->notify(new ResetPasswordNotification($resetUrl));
}
}
