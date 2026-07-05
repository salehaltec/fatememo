@extends('layouts.app')

@section('content')

    <h1>خدمات ما</h1>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">

        @foreach($services as $service)
            <div style="background:white; padding:20px; border-radius:8px;">
                <h3>{{ $service->title_fa }}</h3>
                <p>{{ $service->description_fa }}</p>
            </div>
        @endforeach

    </div>

@endsection
