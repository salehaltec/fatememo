<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta name="theme-color" content="#0f172a">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="کوچینگ حرفه‌ای کسب‌وکار توسط فاطمه محمدی">
    <meta name="keywords" content="کوچینگ, کسب و کار, رشد فروش, بیزنس کوچ">
    <meta name="author" content="Fatemeh Mohammadi">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800;900&family=Vazirmatn:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: Vazirmatn, sans-serif;
        }
    </style>
    <meta charset="UTF-8">
    <title>Fatemeh Mohammadi</title>

    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            background: #f7f7f7;
            direction: rtl;
        }

        header {
            background: #111;
            color: white;
            padding: 15px;
        }

        nav a {
            color: white;
            margin: 10px;
            text-decoration: none;
        }

        .container {
            width: 90%;
            margin: auto;
            padding: 20px;
        }

        footer {
            background: #111;
            color: white;
            text-align: center;
            padding: 20px;
            margin-top: 40px;
        }

        .card {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
        }

        .btn {
            background: #111;
            color: white;
            padding: 8px 12px;
            border: none;
            cursor: pointer;
        }
    </style>
</head>

<body>
@if(session('success'))
    <div style="background:green;color:white;padding:10px;text-align:center;">
        {{ session('success') }}
    </div>
@endif

<header style="background:#111; padding:15px;">
    <nav style="display:flex; gap:15px;">
        <a style="color:white;" href="/">خانه</a>
        <a style="color:white;" href="/about">درباره</a>
        <a style="color:white;" href="/services">خدمات</a>
        <a style="color:white;" href="/contact">تماس</a>
    </nav>
</header>

<div class="container">
    @yield('content')
</div>

<footer style="background:#111; color:white; text-align:center; padding:20px; margin-top:40px;">
    © 2026 Fatemeh Mohammadi Coaching
</footer>

</body>
</html>
