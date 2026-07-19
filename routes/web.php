<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SharedContactController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'home');
Route::get('/about', [AboutController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/contact', [ContactController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);

Route::view('/business-check', 'business-check');
Route::view('/business-consultant', 'business-consultant');
Route::view('/business-systemization', 'business-systemization');

Route::prefix('api')->middleware('throttle:60,1')->group(function () {
    Route::post('/otp/send', [OtpController::class, 'send']);
    Route::post('/otp/verify', [OtpController::class, 'verify']);
    Route::post('/assessments', [AssessmentController::class, 'store']);
    Route::get('/contact-profile', [SharedContactController::class, 'show']);
    Route::post('/contact-requests', [SharedContactController::class, 'store']);
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::redirect('/', '/admin/dashboard');
    Route::get('/login', [AdminAuthController::class, 'create'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'authenticate'])->name('login.authenticate');
    Route::middleware('admin.phone')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/users/{phone}', [DashboardController::class, 'show'])->name('users.show');
        Route::get('/export', [DashboardController::class, 'export'])->name('export');
        Route::resource('/services', \App\Http\Controllers\Admin\ServiceController::class);
        Route::resource('/messages', \App\Http\Controllers\Admin\MessageController::class)->only(['index', 'show', 'destroy']);
        Route::post('/logout', [AdminAuthController::class, 'destroy'])->name('logout');
    });
});

require __DIR__.'/auth.php';
