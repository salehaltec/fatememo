<h1>Edit Service</h1>

<form method="POST" action="{{ route('admin.services.update', $service->id) }}">
    @csrf
    @method('PUT')

    <input name="title_fa" value="{{ $service->title_fa }}">
    <br><br>

    <textarea name="description_fa">{{ $service->description_fa }}</textarea>
    <br><br>

    <button type="submit">Update</button>
</form>
