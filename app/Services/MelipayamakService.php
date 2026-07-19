<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class MelipayamakService
{
    public function sendOtp(string $phone, string $code): void
    {
        $username = trim((string) config('services.melipayamak.username'));
        $password = trim((string) config('services.melipayamak.password'));
        $apiKey = trim((string) config('services.melipayamak.api_key'));
        $credential = $apiKey !== '' ? $apiKey : $password;
        $bodyId = trim((string) config('services.melipayamak.body_id'));

        if (app()->environment(['local', 'testing']) && ! $username) {
            logger()->info("Melipayamak OTP for {$phone}: {$code}");
            return;
        }

        if ($username === '' || $credential === '' || $bodyId === '') {
            logger()->error('Melipayamak configuration is incomplete.', [
                'has_username' => $username !== '',
                'has_credential' => $credential !== '',
                'has_body_id' => $bodyId !== '',
            ]);

            throw new RuntimeException('سرویس پیامک به‌درستی تنظیم نشده است.');
        }

        try {
            $response = Http::asForm()->connectTimeout(10)->timeout(20)->retry(2, 500)->post(
                'https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber',
                [
                    'username' => $username,
                    'password' => $credential,
                    'text' => $code,
                    'to' => $phone,
                    'bodyId' => (int) $bodyId,
                ]
            );
        } catch (\Throwable $exception) {
            report($exception);
            throw new RuntimeException('ارتباط با سرویس پیامک برقرار نشد. لطفاً دوباره تلاش کنید.');
        }

        $data = $response->json();
        $returnValue = $this->returnValue($data);
        $accepted = $response->successful()
            && (is_array($data) ? ((int) ($data['RetStatus'] ?? 1) === 1) : true)
            && $returnValue > 0;

        if (! $accepted) {
            logger()->error('Melipayamak rejected OTP.', [
                'http_status' => $response->status(),
                'return_value' => $returnValue,
                'response' => $response->body(),
            ]);

            throw new RuntimeException($this->errorMessage($returnValue));
        }
    }

    private function returnValue(mixed $data): int
    {
        if (is_numeric($data)) return (int) $data;
        if (! is_array($data)) return 0;

        $value = $data['Value'] ?? $data['ReturnValue'] ?? $data['value'] ?? 0;
        return is_numeric($value) ? (int) $value : 0;
    }

    private function errorMessage(int $code): string
    {
        return match ($code) {
            -110 => 'کلید API ملی‌پیامک تنظیم نشده یا معتبر نیست.',
            -109 => 'IP سرور در پنل ملی‌پیامک مجاز نشده است.',
            -108 => 'IP سرور به‌دلیل تلاش ناموفق موقتاً مسدود شده است.',
            -5 => 'متغیرهای الگوی پیامک با متن ارسال‌شده مطابقت ندارند.',
            -4 => 'کد الگوی پیامک صحیح یا تأییدشده نیست.',
            0 => 'نام کاربری یا اطلاعات دسترسی ملی‌پیامک صحیح نیست.',
            2 => 'اعتبار پنل پیامکی کافی نیست.',
            default => 'ارسال پیامک ناموفق بود. لطفاً دوباره تلاش کنید.',
        };
    }
}
