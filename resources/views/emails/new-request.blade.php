<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head><meta charset="utf-8"><title>درخواست جدید</title></head>
<body style="font-family:Tahoma,Arial,sans-serif;direction:rtl;text-align:right;color:#252238;line-height:1.9">
    <h2>یک درخواست جدید در سایت ثبت شد</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px">
        <tr><td><strong>نوع:</strong></td><td>{{ $requestData['type'] }}</td></tr>
        <tr><td><strong>نام:</strong></td><td>{{ $requestData['name'] }}</td></tr>
        <tr><td><strong>شماره تماس:</strong></td><td dir="ltr" style="text-align:right">{{ $requestData['phone'] ?: '—' }}</td></tr>
        <tr><td><strong>ایمیل:</strong></td><td>{{ $requestData['email'] ?: '—' }}</td></tr>
        @if($requestData['business_name'])<tr><td><strong>نام کسب‌وکار:</strong></td><td>{{ $requestData['business_name'] }}</td></tr>@endif
        @if($requestData['service'])<tr><td><strong>خدمت:</strong></td><td>{{ $requestData['service'] }}</td></tr>@endif
        <tr><td><strong>منبع:</strong></td><td>{{ $requestData['source'] }}</td></tr>
    </table>
    @if($requestData['message'])
        <h3>متن درخواست</h3>
        <p style="white-space:pre-wrap">{{ $requestData['message'] }}</p>
    @endif
    <p><a href="{{ url('/admin/dashboard') }}">مشاهده در پنل مدیریت</a></p>
</body>
</html>
