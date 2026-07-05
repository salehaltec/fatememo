<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تماس با ما</title>
</head>
<body>

<h1>تماس با ما</h1>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif

<form method="POST" action="/contact">
    @csrf

    <input name="name" placeholder="نام">
    <br><br>

    <input name="email" placeholder="ایمیل">
    <br><br>

    <input name="phone" placeholder="شماره">
    <br><br>

    <textarea name="message" placeholder="پیام"></textarea>
    <br><br>

    <button type="submit">ارسال</button>
</form>

</body>
</html>
