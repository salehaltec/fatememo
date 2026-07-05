<h1>Create Service</h1>

<form method="POST" action="{{ route('admin.services.store') }}">
    @csrf

    <input name="title_fa" placeholder="Title">
    <br><br>

    <textarea name="description_fa" placeholder="Description"></textarea>
    <br><br>

    <button type="submit">Save</button>
</form>
