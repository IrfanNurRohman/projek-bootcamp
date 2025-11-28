<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Google analytics -->

    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ asset('image/logo.png') }}" />

    <!-- Font awesome -->
    <link href="{{ asset('assets_user/css/font-awesome.css') }}" rel="stylesheet">
    <!-- Bootstrap -->
    <link href="{{ asset('assets_user/css/bootstrap.css') }}" rel="stylesheet">
    <!-- Slick slider -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets_user/css/slick.css') }}">
    <!-- Fancybox slider -->
    <link rel="stylesheet" href="{{ asset('assets_user/css/jquery.fancybox.css') }}" type="text/css" media="screen" />
    <!-- Theme color -->
    <link id="switcher" href="{{ asset('assets_user/css/theme-color/default-theme.css') }}" rel="stylesheet">
    <!-- Main style sheet -->
    <link href="{{ asset('assets_user/css/style.css') }}" rel="stylesheet">


    <!-- Google Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,400italic,300,300italic,500,700' rel='stylesheet' type='text/css'>


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

  </head>
  <body>

  <!--START SCROLL TOP BUTTON -->
    <a class="scrollToTop" href="#">
      <i class="fa fa-angle-up"></i>
    </a>
    <!--<p class="scrollToTop">{{  date('Y-m-d H:i:s') }}</p>-->
  <!-- END SCROLL TOP BUTTON -->
 
  <!-- Start menu -->
  <section id="mu-menu">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="background-color: #34baeb;">
      <div class="container">
        <div class="navbar-header">
          <!-- FOR MOBILE VIEW COLLAPSED BUTTON -->
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- LOGO -->
          <!-- TEXT BASED LOGO -->
          <a class="navbar-brand" href="{{ route('index') }}"><img src="/image/logo.png" style="width:40px;height:40px;display: block;" alt="{{ config('app.name', 'Laravel') }}" />
          <a class="navbar-brand float-right ml-1" href="{{ route('index') }}" style="color:#ffffff; font-size: 20pt; padding-top:30px;">{{ config('app.name', 'Laravel') }}</a>
          <!-- IMG BASED LOGO  -->
          <!-- <a class="navbar-brand" href="index.html"><img src="assets/img/logo.png" alt="logo"></a> -->
        </div>
        <p></p>
        <div id="navbar" class="navbar-collapse collapse">
          <ul id="top-menu" class="nav navbar-nav navbar-right main-nav">
            <li><a href="{{ route('index') }}" style="color:#ffffff;">Home</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="color:#ffffff;">Profil <span class="fa fa-angle-down"></span></a>
              <ul class="dropdown-menu" role="menu">
              <li><a href="{{ route('vision') }}">Visi Misi</a></li>
                <li><a href="{{ route('principals') }}">Sambutan Kepala Sekolah</a></li>
              </ul>
            </li>
            <li><a href="{{ route('artikel') }}" style="color:#ffffff;">Berita</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="color:#ffffff;">Galeri <span class="fa fa-angle-down"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="{{ route('gallery') }}">Galeri</a></li>
                <li><a href="{{ route('activities') }}">Kegiatan</a></li>
              </ul>
            </li>
            <li><a href="{{ route('teacher') }}" style="color:#ffffff;">Guru</a></li>
            <li><a href="{{ route('contact') }}" style="color:#ffffff;">Kontak kami</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
  </section>
  <!-- End menu -->



  @yield('content')
  
    <!-- Start footer -->
  <footer id="mu-footer">
    <!-- start footer top -->
    <div class="mu-footer-top">
      <div class="container">
        <div class="mu-footer-top-area">
          <div class="row">
            <div class="col-lg-5 col-md-5 col-sm-5">
              <div class="mu-footer-widget">
                <h4>Information</h4>
                <ul>
                <li><a href="{{ route('index') }}">Home</a></li>
                  <li><a href="{{ route('principals') }}">Sambutan Kepala Sekolah</a></li>
                  <li><a href="{{ route('artikel') }}">Berita</a></li>
                  <li><a href="{{ route('teacher') }}">Guru</a></li>
                  <li><a href="{{ route('contact') }}">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-5 col-md-5 col-sm-5">
              <div class="mu-footer-widget">
                <h4>Contact</h4>
                <address>
                  <p>Purwodadi, Cisumur, Kec. Gandrungmangu, Kabupaten Cilacap, Jawa Tengah 53254</p>
                  <p>Phone: 0895383078876</p>
                  <p>Website: {{ config('app.url', 'Laravel') }}</p>
                  <p>Email: {{ config('app.mail_from_address', 'admin@paudassyifa.my.id') }}</p>
                </address>
                <a href="https://www.facebook.com/kb.assyifa.5" target="_blank"><span class="fa fa-facebook" style='font-size:28px;color:white'></span></a>&nbsp;
                <a href="https://instagram.com/paudassyifa2022?igshid=YmMyMTA2M2Y=" target="_blank"><span class="fa fa-instagram" style='font-size:28px;color:white'></span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end footer top -->
    <!-- start footer bottom -->
    <div class="mu-footer-bottom">
      <div class="container">
        <div class="mu-footer-bottom-area">
          <p>&copy; {{ date('Y') }} All Right Reserved. Designed by <a href="/" rel="nofollow">{{ config('app.name', 'Laravel') }}</a></p>
        </div>
      </div>
    </div>
    <!-- end footer bottom -->
  </footer>
  <!-- End footer -->

  <!-- jQuery library -->
  <script src="{{ asset('assets_user/js/jquery.min.js') }}"></script>
  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="{{ asset('assets_user/js/bootstrap.js') }}"></script>
  <!-- Slick slider -->
  <script type="text/javascript" src="{{ asset('assets_user/js/slick.js') }}"></script>
  <!-- Counter -->
  <script type="text/javascript" src="{{ asset('assets_user/js/waypoints.js') }}"></script>
  <script type="text/javascript" src="{{ asset('assets_user/js/jquery.counterup.js') }}"></script>
  <!-- Mixit slider -->
  <script type="text/javascript" src="{{ asset('assets_user/js/jquery.mixitup.js') }}"></script>
  <!-- Add fancyBox -->
  <script type="text/javascript" src="{{ asset('assets_user/js/jquery.fancybox.pack.js') }}"></script>

  <!-- Custom js -->
  <script src="{{ asset('assets_user/js/custom.js') }}"></script>

  </body>
</html>