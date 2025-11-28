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
                  <h2>Sambutan Kepala Sekolah</h2>
                </div>
                @forelse($principal as $p)
                  <!-- End Title -->
                  <p>{{ $p->desc }}</p>
                <!-- End Title -->
                @forelse($about as $a)
                <p>{{ $a->desc }}</p>
              </div>
              @empty
              @endforelse
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="mu-about-us-right">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109268.84973066079!2d108.75895643256206!3d-7.527608199999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6579186d5a920f%3A0x434d54944acaee2f!2sPAUD%20ASSYIFA!5e1!3m2!1sid!2sid!4v1647173887821!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
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
