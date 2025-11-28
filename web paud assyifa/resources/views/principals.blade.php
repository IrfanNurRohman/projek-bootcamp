@extends('layouts.app')
@section('content')
<!-- Start about us -->
<section id="mu-about-us">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="mu-about-us-area">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="mu-about-us-left">
                <!-- Start Title -->
                <div class="mu-title">
                <p></p><br><br>
                  <h2>Sambutan Kepala Sekolah</h2>
                </div>
                @forelse($principal as $p)
                  <!-- End Title -->
                  <p>{{ $p->desc }}</p>
                <!-- End Title -->
              </div>
              @empty
              @endforelse
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="mu-about-us-right">
              <img src="principal/{{ $p->photo }}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" alt="img">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End about us -->
@endsection
