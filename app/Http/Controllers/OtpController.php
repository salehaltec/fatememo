<?php

namespace App\Http\Controllers;

use App\Services\MelipayamakService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class OtpController extends Controller
{
    public function send(Request $request, MelipayamakService $sms): JsonResponse
    {
        $data = $request->validate(['phone' => ['required', 'regex:/^09\d{9}$/']]);
        $phone = $data['phone'];
        $key = 'otp-send:'.$phone.'|'.$request->ip();
        if (RateLimiter::tooManyAttempts($key, 3)) {
            throw ValidationException::withMessages(['phone' => 'تعداد درخواست‌ها زیاد است. چند دقیقه دیگر تلاش کنید.']);
        }

        RateLimiter::hit($key, 300);
        $code = (string) random_int(100000, 999999);
        Cache::put('otp:'.$phone, hash('sha256', $code), now()->addMinutes(3));
        $sms->sendOtp($phone, $code);

        return response()->json(['message' => 'کد تأیید ارسال شد.', 'expires_in' => 180]);
    }

    public function verify(Request $request): JsonResponse
    {
        $data = $request->validate([
            'phone' => ['required', 'regex:/^09\d{9}$/'],
            'code' => ['required', 'digits:6'],
        ]);
        $key = 'otp-verify:'.$data['phone'].'|'.$request->ip();
        if (RateLimiter::tooManyAttempts($key, 6)) {
            throw ValidationException::withMessages(['code' => 'تعداد تلاش‌ها زیاد است. دوباره کد دریافت کنید.']);
        }
        RateLimiter::hit($key, 300);
        $stored = Cache::get('otp:'.$data['phone']);
        if (! $stored || ! hash_equals($stored, hash('sha256', $data['code']))) {
            throw ValidationException::withMessages(['code' => 'کد واردشده صحیح یا معتبر نیست.']);
        }

        Cache::forget('otp:'.$data['phone']);
        RateLimiter::clear($key);
        $request->session()->put('verified_phone', $data['phone']);
        $request->session()->put('phone_verified_at', now()->timestamp);

        return response()->json(['verified' => true, 'phone' => $data['phone']]);
    }
}
