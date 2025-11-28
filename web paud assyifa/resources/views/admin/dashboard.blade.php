@extends('admin.layouts.app')

@section('content')
<section class="section">
  <div class="section-header">
    <h1>Dashboard - Ringkasan Situs {{ date("Y-m-d h:i:sa") }}</h1>
  </div>
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <div class="card card-statistic-1">
          <div class="card-icon bg-primary">
            <i class="far fa-user"></i>
          </div>
          <div class="card-wrap">
            <div class="card-header">
              <h4>Total Visitor</h4>
            </div>
            <div class="card-body">
              {{ $tot_visitor }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <div class="card card-statistic-1">
          <div class="card-icon bg-danger">
            <i class="far fa-newspaper"></i>
          </div>
          <div class="card-wrap">
            <div class="card-header">
              <h4>Artikel</h4>
            </div>
            <div class="card-body">
              {{ $tot_blogs }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <div class="card card-statistic-1">
          <div class="card-icon bg-warning">
            <i class="far fa-file"></i>
          </div>
          <div class="card-wrap">
            <div class="card-header">
              <h4>Galeri</h4>
            </div>
            <div class="card-body">
              {{ $tot_gallery }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <div class="card card-statistic-1">
          <div class="card-icon bg-success">
            <i class="far fa-envelope"></i>
          </div>
          <div class="card-wrap">
            <div class="card-header">
              <h4>Mail</h4>
            </div>
            <div class="card-body">
              {{ $tot_mailer }}
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
<div class="col-12 col-sm-6 col-lg-12">
  <div class="card">
    <div class="card-header">
      <h4>Galeri</h4>
    </div>
    <div class="card-body">
      <div class="gallery">
        @forelse($gallery_list as $list)
          <div class="gallery-item" data-image="/gallerys/{{ $list->photo }}" data-title="Image 1"></div>
        @empty
        @endforelse
      </div>
      <div class="card-footer text-right">
        {{ $gallery_list->links() }}
      </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-6">
      <div class="card">
        <div class="card-header">
          <h4>Artikel</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered table-md">
              <tr>
                <th>#</th>
                <th>Judul</th>
                <th>konten</th>
                <th>Created At</th>
              </tr>
               <!-- Loop -->
              @forelse($artikel as $row)
              @php $no = 1; @endphp
              <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $row->title }}</td>
                <td>{!! $row->content !!}</td>
                <td>{{ $row->created_at }}</td>
              </tr>
               @empty
              <tr>
                <td colspan="4" class="text-center">Empty</td>
              </tr>
              @endforelse
            </table>
          </div>
        </div>
        <div class="card-footer text-right">
         {{ $artikel->links() }}
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-6">
      <div class="card">
        <div class="card-header">
          <h4>Mailer</h4>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-striped table-md">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Messages</th>
              </tr>
              <!-- Loop -->
              @forelse($mailer as $row)
              @php $no = 1; @endphp
              <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $row->name }}</td>
                <td>{{ $row->email }}</td>
                <td>{{ $row->subject }}</td>
                <td>{{ $row->message }}</td>
              </tr>
              @empty
              <tr>
                <td colspan="4" class="text-center">Empty</td>
              </tr>
              @endforelse
            </table>
          </div>
        </div>
        <div class="card-footer text-right">
          {{ $mailer->links() }}
        </div>
      </div>
    </div>
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
</div>
@endsection
