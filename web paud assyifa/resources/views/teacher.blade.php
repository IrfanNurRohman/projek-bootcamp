@extends('layouts.app')
@section('content')
<!-- Start our teacher -->
<section id="mu-our-teacher">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="mu-our-teacher-area">
          <!-- begain title -->
          <div class="mu-title">
            <h2>Guru</h2>
            <p>Guru adalah pahlawan tanpa tanda jasa</p>
          </div>
          <!-- end title -->
          <!-- begain our teacher content -->
          <div class="mu-our-teacher-content">
            <div class="row">
              @forelse($teacher as $t)
              <div class="col-lg-4 col-md-3 col-sm-6">
                <div class="mu-our-teacher-single">
                  <figure class="mu-our-teacher-img">
                    <img src="/teachers/{{ $t->photo }}" width="300px" height="400px" alt="teacher img">
                    <div class="mu-our-teacher-social">
                      <a href="{{ $t->facebook }}"><span class="fa fa-facebook"></span></a>
                      <a href="{{ $t->instagram }}"><span class="fa fa-instagram"></span></a>
                    </div>
                  </figure>
                  <div class="mu-ourteacher-single-content">
                    <h4>{{ $t->name }}</h4>
                    <span>{{ $t->course }}</span>
                  </div>
                </div>
              </div>
              @empty
              @endforelse
            </div>
          </div>
          <p></p>
          <div class="mu-pagination">
            {{ $teacher->links() }}
          </div>
          <!-- End our teacher content -->
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End our teacher -->
@endsection