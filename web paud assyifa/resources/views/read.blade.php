@extends('layouts.app')
@section('content')
<!-- Page breadcrumb -->
<section id="mu-page-breadcrumb">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="mu-page-breadcrumb-area">
          <h2>Berita</h2>
          <ol class="breadcrumb">
           <li><a href="#">Home</a></li>
           <li class="active">Berita</li>
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
               <div class="mu-course-container mu-blog-single">
                 <div class="row">
                   <div class="col-md-12">
                     <article class="mu-blog-single-item">
                       <figure class="mu-blog-single-img">
                         <a href="#"><img alt="img" src="/blogs/{{ $blog->photo }}"></a>
                         <figcaption class="mu-blog-caption">
                           <h3><a href="#">{{ $blog->title }}</a></h3>
                         </figcaption>
                       </figure>
                       <div class="mu-blog-meta">
                         <a href="#">By Admin</a>
                         <a href="#">{{ $blog->created_at }}</a>
                       </div>
                       <div class="mu-blog-description">
                          {!! $blog->content !!}
                       </div>
                       <!-- start blog post tags -->
                       <div class="mu-blog-tags">
                         <ul class="mu-news-single-tagnav">
                           <li>TAGS :</li>
                           <li><a href="#">{{ $blog->category }}</a></li>
                         </ul>
                       </div>
                       <!-- End blog post tags -->
                     </article>
                   </div>
                 </div>
               </div>
               <!-- end course content container -->
               <!-- start related course item -->
               <div class="row">
                 <div class="col-md-12">
                   <div class="mu-related-item">
                     <h3>Related News</h3>
                     <div class="mu-related-item-area">
                       <div id="mu-related-item-slide">
                         @forelse($related as $r)
                         <div class="col-md-6">
                           <article class="mu-blog-single-item">
                             <figure class="mu-blog-single-img">
                               <a href="#"><img alt="img" src="/blogs/{{ $r->photo }}"></a>
                               <figcaption class="mu-blog-caption">
                                 <h3><a href="#">{!! Str::limit($r->title, 35) !!}</a></h3>
                               </figcaption>
                             </figure>
                             <div class="mu-blog-meta">
                               <a href="#">By Admin</a>
                               <a href="#">{{ $r->created_at->toDateString() }}</a>
                             </div>
                             <div class="mu-blog-description">
                               <p></p>
                               <a href="{{ route('news.detail', $r->id) }}" class="mu-read-more-btn">Read More</a>
                             </div>
                           </article>
                         </div>
                         @empty
                         @endforelse
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <!-- end start related course item -->
             </div>
             <div class="col-md-3">
               <!-- start sidebar -->
               <aside class="mu-sidebar">
                 <!-- start single sidebar -->
                 <div class="mu-single-sidebar">
                   <h3>Categories</h3>
                   <ul class="mu-sidebar-catg">
                     <li><a href="#">{{ $blog->category }}</a></li>
                   </ul>
                 </div>
                 <!-- end single sidebar -->
               </aside>
               <!-- / end sidebar -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection
