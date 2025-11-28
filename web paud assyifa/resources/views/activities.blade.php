@extends('layouts.app')
@section('content')
<!-- Page breadcrumb -->
<section id="mu-page-breadcrumb">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="mu-page-breadcrumb-area">
          <h2>Kegiatan</h2>
          <ol class="breadcrumb">
           <li><a href="#">Home</a></li>
           <li class="active">kegiatan</li>
         </ol>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End breadcrumb -->
<section id="mu-course-content">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="mu-course-content-area">
           <div class="row">
             <div class="col-md-9">
               <!-- start course content container -->
               <div class="mu-course-container">
                 <div class="row">
                   @forelse($activities as $act)
                   <div class="col-md-6 col-sm-6">
                   <div class="mu-latest-course-single">
                     <figure class="mu-latest-course-img">
                       <a href="#"><img src="/events/{{ $act->photo }}" style=" height: 260px;width: 100%;object-fit: cover;"alt="img"></a>
                     </figure>
                     <div class="mu-latest-course-single-content">
                       <h4><a href="#">{{ $act->title }}</a></h4>
                       <p>{{ $act->desc }}</p>
                       <div class="mu-latest-course-single-contbottom">
                         <span class="fa fa-eye"><a href="{{ route('event.detail', $act->id) }}"> Read More</a></span>
                       </div>
                     </div>
                   </div>
                 </div>
                 @empty
                 @endforelse
                 </div>
               </div>
               <!-- end course content container -->
               <!-- start course pagination -->
               <div class="mu-pagination">
                 {{ $activities->links() }}
               </div>
               <!-- end course pagination -->
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection
