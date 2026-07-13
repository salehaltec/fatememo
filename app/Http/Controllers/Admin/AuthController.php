<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\MelipayamakService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class AuthController extends Controller
{
    public function create(): View { return view('admin.auth.login'); }

    public function send(Request $request, MelipayamakService $sms): RedirectResponse
    {
        $data = $request->validate(['phone' => ['required', 'regex:/^09\d{9}$/']]);
        if (! hash_equals((string) config('services.admin.phone'), $data['phone'])) {
            throw ValidationException::withMessages(['phone' => 'این شماره اجازه ورود به مدیریت را ندارد.']);
        }
        $key = 'admin-otp:'.$request->ip();
        if (RateLimiter::tooManyAttempts($key, 3)) {
            throw ValidationException::withMessages(['phone' => 'کمی بعد دوباره تلاش کنید.']);
        }
        RateLimiter::hit($key, 300);
        $code = (string) random_int(100000, 999999);
        Cache::put('admin-otp:'.$data['phone'], hash('sha256', $code), now()->addMinutes(3));
        $sms->sendOtp($data['phone'], $code);
        return back()->with('otp_sent', true)->withInput();
    }

    public function verify(Request $request): RedirectResponse
    {
        $data = $request->validate(['phone' => ['required'], 'code' => ['required', 'digits:6']]);
        $stored = Cache::get('admin-otp:'.$data['phone']);
        if (! $stored || ! hash_equals($stored, hash('sha256', $data['code']))) {
            throw ValidationException::withMessages(['code' => 'کد واردشده صحیح نیست.']);
        }
        Cache::forget('admin-otp:'.$data['phone']);
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
