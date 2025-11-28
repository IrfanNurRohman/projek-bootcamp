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
            <h2>Visi dan Misi</h2>
          </div>
          <!-- end title -->
          <!-- start from blog content   -->
          <div class="mu-from-blog-content">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <article class="mu-blog-single-item">
                <h4><b>Visi</b></h4>
                    @forelse($visimisi as $v)
                    <p>{!! $v->vision !!}</p>
                    @empty
                </div>
                    @endforelse
                <h4><b>Misi</b></h4>
                    @forelse($visimisi as $m)
                    <p>{!! $m->mision !!}</p>
                    @empty
                    @endforelse
            </div>
             {{ $visimisi->links() }}
          </div>
          <!-- end from blog content   -->
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End from blog -->
@endsection
