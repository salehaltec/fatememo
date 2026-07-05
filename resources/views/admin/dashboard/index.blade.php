@extends('layouts.admin')

@section('content')

    <h1>داشبورد</h1>

    <div class="card">
        <h3>تعداد خدمات: {{ $servicesCount }}</h3>
    </div>

    <div class="card">
        <h3>تعداد پیام‌ها: {{ $messagesCount }}</h3>
    </div>

    <h2>آخرین پیام‌ها</h2>

    @foreach($latestMessages as $message)
        <div class="card">
            <b>{{ $message->name }}</b>
            <p>{{ $message->message }}</p>
        </div>
    @endforeach

@endsection
