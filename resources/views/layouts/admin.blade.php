<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel</title>

    <style>
        body {
            margin: 0;
            font-family: sans-serif;
            display: flex;
            background: #f4f4f4;
        }

        .sidebar {
            width: 220px;
            background: #111;
            color: white;
            height: 100vh;
            padding: 20px;
        }

        .sidebar a {
            display: block;
            color: white;
            text-decoration: none;
            margin: 10px 0;
        }

        .main {
            flex: 1;
            padding: 20px;
        }

        .card {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
        }
    </style>
</head>

<body>

<div class="sidebar">
    <h3>مدیریت</h3>

    <a href="/admin/dashboard">داشبورد</a>
    <a href="/admin/services">خدمات</a>
    <a href="/admin/messages">پیام‌ها</a>

    <hr>

    <form method="POST" action="/logout">
        @csrf
        <button style="background:red;color:white;width:100%">خروج</button>
    </form>
</div>

<div class="main">
    @yield('content')
</div>

</body>
</html>
