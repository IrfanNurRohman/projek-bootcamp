@extends('layouts.app')
@section('content')
<style>
  .space { margin-top: 45px; }
  
  .cardBox {
  float: left;
  font-size: 1.2em;
  margin: 1% 0 0 1%;
  perspective: 800px;
  transition: all 0.3s ease 0s;
  width: 23.7%;
  }

  .cardBox:hover .card {
    transform: rotateY( 180deg);
  }

  .card {
    background: #01bafd;
    cursor: default;
    height: 300px;
    transform-style: preserve-3d;
    transition: transform 0.4s ease 0s;
    width: 100%;
    -webkit-animation: giro 1s 1;
    animation: giro 1s 1;
  }

  .card p {
    margin-bottom: 1.8em;
  }

  .card .front,
  .card .back {
    backface-visibility: hidden;
    box-sizing: border-box;
    color: white;
    display: block;
    font-size: 1.2em;
    height: 100%;
    padding: 0.8em;
    position: absolute;
    text-align: center;
    width: 100%;
  }

  .card .front strong {
    background: #fff;
    border-radius: 100%;
    color: #222;
    font-size: 1.5em;
    line-height: 30px;
    padding: 0 7px 4px 6px;
  }

  .card .back {
    transform: rotateY( 180deg);
  }

  .card .back a {
    padding: 0.3em 0.5em;
    background: #333;
    color: #fff;
    text-decoration: none;
    border-radius: 1px;
    font-size: 0.9em;
    transition: all 0.2s ease 0s;
  }

  .card .back a:hover {
    background: #fff;
    color: #333;
    text-shadow: 0 0 1px #333;
  }

  .cardBox:nth-child(1) .card .back {
    background: #03e8fc;
  }

  .cardBox:nth-child(2) .card .back {
    background: #6b676b;
  }

  .cardBox:nth-child(3) .card .back {
    background: #03e8fc;
  }

  .cardBox:nth-child(4) .card .back {
    background: #6b676b;
  }

  .cardBox:nth-child(2) .card {
    -webkit-animation: giro 1.5s 1;
    animation: giro 1.5s 1;
  }

  .cardBox:nth-child(3) .card {
    -webkit-animation: giro 2s 1;
    animation: giro 2s 1;
  }

  .cardBox:nth-child(4) .card {
    -webkit-animation: giro 2.5s 1;
    animation: giro 2.5s 1;
  }

  @-webkit-keyframes giro {
    from {
      transform: rotateY( 180deg);
    }
    to {
      transform: rotateY( 0deg);
    }
  }

  @keyframes giro {
    from {
      transform: rotateY( 180deg);
    }
    to {
      transform: rotateY( 0deg);
    }
  }

  @media screen and (max-width: 767px) {
    .cardBox {
      margin-left: 2.8%;
      margin-top: 3%;
      width: 46%;
    }
    .card {
      height: 285px;
    }
    .cardBox:last-child {
      margin-bottom: 3%;
    }
  }

  @media screen and (max-width: 480px) {
    .cardBox {
      width: 94.5%;
    }
    .card {
      height: 260px;
    }
  }
</style>
  <!-- Start Slider -->
  <section id="mu-slider">
    <!-- Start single slider item -->
    @forelse($slider as $s)
    <div class="mu-slider-single">
      <div class="mu-slider-img">
        <figure>
          <img src="sliders/{{ $s->photo }}" alt="img">
        </figure>
      </div>
      <div class="mu-slider-content">
         <p></p><br><br>
        <h4>Selamat Datang Di {{ config('app.name', 'Laravel') }}</h4>
        <span></span>
        <h2>Home</h2>
        <p>Paud Assyifa adalah tempat belajar dan bermain</p>
      </div>
    </div>
     @empty
     @endforelse
    <!-- Start single slider item -->
  </section>
  <!-- End Slider -->
  <!-- Start service  -->
  <section id="mu-service">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12">
        <div class="boxesContainer">
        <div class="cardBox">
          <div class="card">
            <div class="front">
              <span class="fa fa-book"></span>
              <h3>Belajar Ceria</h3>
              <p style='font-size:18px;'>Belajar sambil bermain</p>
            </div>
            <div class="back">
            <span class="fa fa-book"></span>
              <p>"Jangan pernah berhenti belajar, karena hidup tak pernah berhenti mengajarkan"</p>
            </div>
          </div>
        </div>
        <div class="cardBox">
          <div class="card">
            <div class="front">
              <span class="fa fa-users"></span>
              <h3>Guru profesional</h3>
              <p style='font-size:18px;'>Mendidik dengan ikhlas</p>
            </div>
            <div class="back">
            <span class="fa fa-users"></span>
              <p>"Orang hebat bisa melahirkan beberapa karya bermutu, tetapi guru yang bermutu dapat melahirkan ribuan orang-orang hebat"</p>
            </div>
          </div>
        </div>
        <div class="cardBox">
          <div class="card">
            <div class="front">
              <span class="fa fa-table"></span>
              <h3>Kelas Ceria</h3>
              <p style='font-size:18px;'>Bersih dan nyaman</p>
            </div>
            <div class="back">
            <span class="fa fa-table"></span>
              <p style='font-size:18px;'>"Dunia adalah ruang kelas yang sebenarnya"</p>
            </div>
          </div>
        </div>
        <div class="cardBox">
          <div class="card">
            <div class="front">
              <span class="fa fa-child"></span>
              <h3>Bangun Sejak Dini</h3>
              <p style='font-size:18px;'>Semangat untuk belajar</p>
            </div>
            <div class="back">
            <span class="fa fa-child"></span>
              <p>"Membangun karakter anak sejak sedini mungkin"</p>
            </div>
          </div>
         </div>
        </div>
        </div>
      </div>
    </div>
  <div class="space"></div>
</section>
  <!-- End service  -->

  <!-- Start about us counter -->
  <section id="mu-abtus-counter">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="mu-abtus-counter-area">
            <div class="row">
              <!-- Start counter item -->
              <div class="col-lg-3 col-md-3 col-sm-3">
                <div class="mu-abtus-counter-single">
                  <span class="fa fa-child" style="color:black"></span>
                  <h4 class="counter" style="color:black">{{ $tot_visitor }}</h4>
                  <p style="color:black">Visitor</p>
                </div>
              </div>
              <!-- End counter item -->
              <!-- Start counter item -->
              <div class="col-lg-3 col-md-3 col-sm-3">
                <div class="mu-abtus-counter-single">
                  <span class="fa fa-camera" style="color:black"></span>
                  <a href="{{ route('gallery') }}">
                  <h4 class="counter" style="color:black">{{ $tot_gallery }}</h4>
                  <p style="color:black">Gallery</p>
                </div>
              </div>
              </a>
              <!-- End counter item -->
              <!-- Start counter item -->
              <div class="col-lg-3 col-md-3 col-sm-3">
                <div class="mu-abtus-counter-single">
                  <span class="fa fa-send" style="color:black"></span>
                  <a href="{{ route('artikel') }}">
                  <h4 class="counter" style="color:black">{{ $tot_blogs }}</h4>
                  <p style="color:black">Article</p>
                </div>
              </div>
              </a>
              <!-- End counter item -->
              <!-- Start counter item -->
              <div class="col-lg-3 col-md-3 col-sm-3">
                <div class="mu-abtus-counter-single no-border">
                  <span class="fa fa-graduation-cap" style="color:black"></span>
                  <a href="{{ route('teacher') }}">
                  <h4 class="counter" style="color:black">{{ $tot_teacher }}</h4>
                  <p style="color:black">Teachers</p>
                </div>
              </div>
              </a>
              <!-- End counter item -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End about us counter -->
  </div>
    </div>
     </div>
       </div>
   </section>
  <!-- End features section -->

  <!-- Start Kepsek -->
  <section id="mu-about-us">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="mu-about-us-area">
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <div class="mu-about-us-left">
                  <!-- Start Title -->
                  <a name="sambutan"></a>
                  <a href="{{ route('principals') }}">
                  <div class="mu-title">
                    <h2>Sambutan Kepala Sekolah</h2>
                  </div>
                  @forelse($principal as $p)
                  <!-- End Title -->
                  <p>{{ Str::limit($p->desc, 920) }}</p>
                  </a>
                  <a href="{{ route('vision') }}">
                  <h4><b>Visi</b></h4>
                    @forelse($vision as $v)
                    <p>{!! $v->vision !!}</p>
                    @empty
                  </a>
                </div>
                    @endforelse
                <a href="{{ route('vision') }}">
                <h4><b>Misi</b></h4>
                    @forelse($vision as $m)
                    <p>{!! $m->mision !!}</p>
                    @empty
                    @endforelse
                </a>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="mu-about-us-right">
                  <img src="principal/{{ $p->photo }}" width="550" height="450" style="border:0;" allowfullscreen="" loading="lazy" alt="img">
                </div>
              </div>
              @empty
              @endforelse
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Kepsek -->

  <!-- Start latest course section -->
  <section id="mu-latest-courses">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <div class="mu-latest-courses-area">
            <!-- Start Title -->
            <div class="mu-title">
              <h2>Kegiatan</h2>
              <p>Kegiatan Paud Assyifa</p>
            </div>
            <!-- End Title -->
            <!-- Start latest course content -->
            <div id="mu-latest-course-slide" class="mu-latest-courses-content">
              @forelse($event as $row)
              <div class="col-lg-4 col-md-4 col-xs-12">
                <div class="mu-latest-course-single">
                  <figure class="mu-latest-course-img">
                    <a href="#"><img src="/events/{{ $row->photo }}" style="height:260px;width:100%;object-fit:cover;" alt="img"></a>
                    <figcaption class="mu-latest-course-imgcaption">
                      <a href="#">Kegiatan</a>
                      <span><i class="fa fa-clock-o"></i>{{ $row->created_at->toDateString() }}</span>
                    </figcaption>
                  </figure>
                  <div class="mu-latest-course-single-content">
                    <h5><a href="{{ route('event.detail', $row->id) }}">
                    {{ Str::limit($row->title, 35) }}</a></h5>
                    <p>{{ str::limit($row->desc, 30) }}</p>
                    <div class="mu-latest-course-single-contbottom">
                    </div>
                  </div>
                </div>
              </div>
              @empty
              <p>No events</p>
              @endforelse
            </div>
            <!-- End latest course content -->
        </div>
      </div>
    </div>
  </section>
  <!-- End latest course section -->
  <section id="mu-about-us">
</section>
  <!-- Start testimonial -->
  <section id="mu-testimonial">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="mu-testimonial-area">
            <div class="mu-title">
              <h2 style="color:white">Lembaga</h2>
            </div>
            <div id="mu-testimonial-slide" class="mu-testimonial-content">
              <!-- start testimonial single item -->
              @forelse($institutions as $i)
              <div class="mu-testimonial-item">
                <div class="mu-testimonial-quote">
                  <blockquote>
                    <p>{{ $i->desc }}</p>
                  </blockquote>
                </div>
                <center>
                <div class="mu-testimonial-img">
                  <img src="institutions/{{ $i->photo }}" alt="img">
                </div>
                </center>
                <div class="mu-testimonial-info">
                  <h4>{{ $i->name }}</h4>
                </div>
              </div>
              @empty
              @endforelse
              <!-- end testimonial single item -->
              <!-- end testimonial single item -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="mu-about-us">
</section>
  <!-- End testimonial -->
@endsection
