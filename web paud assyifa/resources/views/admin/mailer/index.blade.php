@extends('admin.layouts.app')
@section('content')

<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4>Mailer | Masuk : {{ $tot_mailer }}</h4>
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
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Create At</th>
              <th>Action</th>
            </tr>
            <!-- Loop -->
            @forelse($mailer as $row)
            <tr>
              <td>{{ $row->name }}</td>
              <td>{{ $row->email }}</td>
              <td>{{ $row->subject }}</td>
              <td>{{ $row->message }}</td>
              <td>{{ $row->created_at }}</td>
              <td><div class="d-flex">
										<form action="{{ route('admin.mailer.hapus', $row->id) }}" method="POST">
											@csrf
											@method('delete')
											<button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
										</form>
								</div></td>
            </tr>
            @empty
            <tr>
              <td colspan="4" class="text-center">Empty</td>
            </tr>
            @endforelse
          </table>
          <div class="card-footer text-right">
            {{ $mailer->links() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

@endsection
