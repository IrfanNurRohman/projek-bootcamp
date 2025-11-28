@extends('admin.layouts.app')
@section('content')

<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4>gallerys</h4>
        <a href="{{ route('admin.gallerys.create') }}"><button class="btn btn-primary" type="submit">Buat gallerys baru</button></a>
      </div>
      @if(session('success.up'))
          <div class="alert alert-success">
            {!! session('success.up') !!}
          </div>
      @endif
      @if(session('success.down'))
          <div class="alert alert-danger">
            {!! session('success.down') !!}
          </div>
      @endif
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped">
            <tr>
              <th>#</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Photo</th>
              <th>Create At</th>
              <th>Action</th>
            </tr>
            <!-- Loop -->
            @forelse($galerys as $row)
            @php $no = 1; @endphp
            <tr>
              <td>{{ $loop->iteration }}</td>
              <td>{{ $row->title }}</td>
              <td>{{ $row->desc }}</td>
              <td><img src="/gallerys/{{ $row->photo }}" style="padding: 5px; width: 150px;" alt="Event"></td>
              <td>{{ $row->created_at }}</td>
              <td>
							  <div class="d-flex">
								  <a href="{{ route('admin.gallerys.edit', $row->id) }}" class="btn btn-warning btn-sm mx-2"><i class="fa fa-edit"></i></a>
										<form action="{{ route('admin.gallerys.hapus', $row->id) }}" method="POST">
											@csrf
											@method('delete')
											<button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
										</form>
								</div>
						 </td>
            </tr>
            @empty
            <tr>
              <td colspan="4" class="text-center">Empty</td>
            </tr>
            @endforelse
          </table>
          <div class="card-footer text-right">
            {{ $galerys->links() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
