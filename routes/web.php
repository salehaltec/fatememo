<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\DashboardController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::view('/', 'home');

Route::get('/about', [AboutController::class, 'index']);

Route::get('/services', [ServiceController::class, 'index']);

Route::get('/contact', [ContactController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth')
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index']);

        Route::resource('/services', \App\Http\Controllers\Admin\ServiceController::class);

    });
Route::resource('/messages', \App\Http\Controllers\Admin\MessageController::class)->only([
    'index', 'show', 'destroy'
]);

Route::view('/business-check', 'business-check');

Route::view('/business-consultant', 'business-consultant');
require __DIR__.'/auth.php';

Route::view('/business-check', 'business-check');
Route::view('/business-consultant', 'business-consultant');
Route::view('/business-systemization', 'business-systemization');
