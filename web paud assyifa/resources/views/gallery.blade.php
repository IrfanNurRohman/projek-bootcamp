@extends('layouts.app')
@section('content')
<!-- Page breadcrumb -->
<section id="mu-page-breadcrumb">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="mu-page-breadcrumb-area">
          <h2>Galeri</h2>
          <ol class="breadcrumb">
           <li><a href="/">Home</a></li>
           <li class="active">Gallery</li>
         </ol>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End breadcrumb -->
<!-- Start gallery  -->
<section id="mu-gallery">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="mu-gallery-area">
         <!-- start title -->
         <div class="mu-title">
           <h2>Moment</h2>
           <p>foto dokumentasi</p>
         </div>
         <!-- end title -->
         <!-- start gallery content -->
         <div class="mu-gallery-content">
           <div class="mu-gallery-body">
             <ul id="mixit-container" class="row">
               <!-- start single gallery image -->
               @forelse($random_gallery as $r)
               <li class="col-md-4 col-sm-6 col-xs-12 mix lab">
                 <div class="mu-single-gallery">
                   <div class="mu-single-gallery-item">
                     <div class="mu-single-gallery-img">
                       <a href="#"><img alt="img" src="/gallerys/{{ $r->photo }}"></a>
                     </div>
                     <div class="mu-single-gallery-info">
                       <div class="mu-single-gallery-info-inner">
                         <h4>{{ $r->title }}"</h4>
                         <p></p>
                         <a href="/gallerys/{{ $r->photo }}" data-fancybox-group="gallery" class="fancybox"><span class="fa fa-eye"></span></a>
                        </div>
                     </div>
                   </div>
                 </div>
               </li>
               @empty
               @endforelse
              </div>
              {{ $random_gallery->links() }}
            </div>
          </div>
        </div>
      </section>
@endsection
<!-- End gallery  -->
