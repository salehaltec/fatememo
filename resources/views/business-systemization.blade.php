<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#0b0f1a">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سیستم‌سازی کسب‌وکار</title>
    <style>
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; height: 100%; background: #0b0f1a; }
        #root { min-height: 100vh; }
    </style>
    @viteReactRefresh
    @vite('resources/js/pages/business-systemization-entry.jsx')
</head>
<body>
    <div id="root"></div>
</body>
</html>
