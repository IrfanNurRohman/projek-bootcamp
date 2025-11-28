@extends('layouts.app')
@section('content')
<!-- Start from blog -->
<section id="mu-from-blog">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="mu-from-blog-area">
          <!-- start title -->
          <div class="mu-title">
          <p></p><br><br>
            <h2>Berita</h2>
          </div>
          <!-- end title -->
          <!-- start from blog content   -->
          <div class="mu-from-blog-content">
            <div class="row">
              @forelse($blog as $b)
              <div class="col-md-4 col-sm-4">
                <article class="mu-blog-single-item">
                  <figure class="mu-blog-single-img">
                    <a href="{{ route('news.detail', $b->id) }}"><img src="blogs/{{ $b->photo }}" width="100"  height:auto; style="border:0;" allowfullscreen="" loading="lazy" alt="img"></a>
                    <figcaption class="mu-blog-caption">
                      <h3><a href="{{ route('news.detail', $b->id) }}">{!! Str::limit($b->title, 35) !!}</a></h3>
                    </figcaption>
                  </figure>
                  <div class="mu-blog-meta">
                    <a href="#">By Admin</a>
                    <span><i class="fa fa-tags"></i>{{ $b->category }}</span>
                  </div>
                  <a href="#">{{ $b->created_at }}</a>
                  <div class="mu-blog-description">
                    <p>{!! Str::limit($b->content, 35) !!}</p>
                  </div>
                  <a class="mu-read-more-btn" href="#"></a>
                </article>
              </div>
              @empty
              @endforelse
            </div>
             {{ $blog->links() }}
          </div>
          <!-- end from blog content   -->
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End from blog -->
@endsection
