@extends('layouts.app')

@section('content')

    <h1>{{ $page->title_fa ?? 'درباره ما' }}</h1>

    <div class="card">
        {!! $page->content_fa ?? '' !!}
    </div>

@endsection
