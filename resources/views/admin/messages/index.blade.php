@extends('layouts.admin')

@section('content')

    <h1>پیام‌ها</h1>

    @foreach($messages as $message)
        <div class="card">
            <b>{{ $message->name }}</b>
            <p>{{ $message->email }}</p>
            <p>{{ $message->message }}</p>

            <a href="/admin/messages/{{ $message->id }}">مشاهده</a>

            <form method="POST" action="/admin/messages/{{ $message->id }}">
                @csrf
                @method('DELETE')
                <button>حذف</button>
            </form>
        </div>
    @endforeach

@endsection
