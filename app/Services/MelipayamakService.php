<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class MelipayamakService
{
    public function sendOtp(string $phone, string $code): void
    {
        if (app()->environment(['local', 'testing']) && ! config('services.melipayamak.username')) {
            logger()->info("Melipayamak OTP for {$phone}: {$code}");
            return;
        }

        $response = Http::asForm()->timeout(15)->post(
            'https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber',
            [
                'username' => config('services.melipayamak.username'),
                'password' => config('services.melipayamak.password'),
                'text' => $code,
                'to' => $phone,
                'bodyId' => config('services.melipayamak.body_id'),
            ]
        );

        $data = $response->json();
        if (! $response->successful() || (isset($data['RetStatus']) && (int) $data['RetStatus'] !== 1)) {
            report(new RuntimeException('Melipayamak rejected OTP: '.$response->body()));
            throw new RuntimeException('ارسال پیامک ناموفق بود. لطفاً دوباره تلاش کنید.');
        }
    }
}
