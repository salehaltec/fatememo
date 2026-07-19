<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class AuthController extends Controller
{
    public function create(): View { return view('admin.auth.login'); }

    public function authenticate(Request $request): RedirectResponse
    {
        $data = $request->validate(['phone' => ['required', 'regex:/^09\d{9}$/']]);
        $key = 'admin-login:'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            throw ValidationException::withMessages(['phone' => 'تعداد تلاش‌ها بیش از حد مجاز است. کمی بعد دوباره تلاش کنید.']);
        }

        if (! hash_equals((string) config('services.admin.phone'), $data['phone'])) {
            RateLimiter::hit($key, 300);
            throw ValidationException::withMessages(['phone' => 'این شماره اجازه ورود به مدیریت را ندارد.']);
        }

        RateLimiter::clear($key);
        $request->session()->regenerate();
        $request->session()->put('admin_phone', $data['phone']);

        return redirect()->route('admin.dashboard');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->forget('admin_phone');
        $request->session()->regenerateToken();
        return redirect()->route('admin.login');
    }
}
