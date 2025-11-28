@extends('admin.layouts.app')
@section('content')

<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4>Visitor</h4>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped">
            <tr>
              <th>IP</th>
              <th>URL</th>
              <th>User Agent</th>
              <th>Create At</th>
              <th>Update At</th>
            </tr>
            <!-- Loop -->
            @forelse($visitor as $row)
            <tr>
              <td>{{ $row->ip_address }}</td>
              <td>{{ $row->url }}</td>
              <td>{{ $row->user_agent }}</td>
              <td>{{ $row->created_at }}</td>
              <td>{{ $row->updated_at }}</td>
            </tr>
            @empty
            <tr>
              <td colspan="4" class="text-center">Empty</td>
            </tr>
            @endforelse
          </table>
          <div class="card-footer text-right">
            {{ $visitor->links() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

@endsection
