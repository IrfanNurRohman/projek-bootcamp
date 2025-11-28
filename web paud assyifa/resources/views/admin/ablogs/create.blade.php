@extends('admin.layouts.app')

@section('content')
<section class="section">
	<div class="section-header">
		<div class="section-header-back">
			<a href="#" class="btn btn-icon"><i class="fas fa-arrow-left"></i></a>
		</div>
		<h1 class="m-0 text-dark">Add New article</h1>
		<div class="section-header-breadcrumb">
			<div class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Home</a></div>
			<div class="breadcrumb-item">Add New</div>
		</div>
	</div>
	<div class="section-body">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<h4>Add New</h4>
					</div>
					<div class="card-body">
						@if(session('error'))
							<div class="alert alert-danger">
								{!! session('error') !!}
							</div>
						@endif

						<form action="{{ route('admin.blogs.store') }}" method="post" enctype="multipart/form-data">
							@csrf
							<div class="form-group">
								<label for="">Title</label>
								<input type="text" name="title" class="form-control @error('title') is-invalid @enderror" required>
								@error('title')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
							</div>
              <div class="form-group">
								<label for="">Kategori</label>
								<input type="text" name="category" class="form-control @error('category') is-invalid @enderror" required>
								@error('category')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
							</div>
							<div class="form-group">
								<label for="">Konten</label>
								<textarea id="editor_forum" name="content" class="form-control @error('content') is-invalid @enderror" style="height: 150px"></textarea>
								@error('content')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
							</div>
              <div class="form-group">
								<label for="customFile">{{ __('Upload Thumbnail') }}</label>
							    <div class="custom-file">
								    <input type="file" name="photo" class="custom-file-input @error('photo') is-invalid @enderror" id="customFile" multiple>
								    <label class="custom-file-label" for="customFile">{{ __('Choose Photo') }}</label>
							    </div>
							    @if (count($errors) > 0)
								<div class="alert alert-danger mt-2">
									<ul>
										@foreach ($errors->all() as $error)
										<li>{{ $error }}</li>
										@endforeach
									</ul>
								</div>
								@endif
							</div>
							<div class="form-group">
								<button class="btn btn-primary">
									<i class="fa fa-paper-plane"></i> Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
@endsection
@push('stylesheet')
<link rel="stylesheet" href="{{ asset('package/selectric/public/selectric.css') }}">
@endpush
@push('stylesheet')
<link rel="stylesheet" href="{{ asset('package/selectric/public/selectric.css') }}">
<link rel="stylesheet" href="{{ asset('package/summernote/dist/summernote.css') }}">
@endpush
@push('javascript')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js"></script>
<script src="{{ asset('package/selectric/public/jquery.selectric.min.js') }}"></script>
<script src="{{ asset('package/summernote/dist/summernote-bs4.js') }}"></script>
<script src="{{ asset('package/emoji/emoji.js') }}"></script>
<script>
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$.ajax({
  url: 'https://api.github.com/emojis',
  async: false
}).then(function(data) {
  window.emojis = Object.keys(data);
  window.emojiUrls = data;
});

$(document).ready(function(){
  $('#editor_forum').summernote({
    height:'250px',
    callbacks: {
      onImageUpload: function(image) {
        uploadImage(image[0]);
        console.log(image[0]);
      },
      onMediaDelete: function(target) {
        deleteImage(target[0].src);
      }
    },
    hint: {
      match: /:([\-+\w]+)$/,
      search: function (keyword, callback) {
        callback($.grep(emojis, function (item) {
          return item.indexOf(keyword)  === 0;
        }));
      },
      template: function (item) {
        var content = emojiUrls[item];
        return '<img src="' + content + '" width="20" /> :' + item + ':';
      },
      content: function (item) {
        var url = emojiUrls[item];
        if (url) {
          return $('<img />').attr('src', url).addClass('emoji-img-inline')[0];
        }
        return '';
      }
    }
  });
});
function uploadImage(image) {
  var data = new FormData();
  data.append("file", image);
  $.ajax({
    url: "{{ route('upload.image') }}",
    cache: false,
    contentType: false,
    processData: false,
    data: data,
    type: "post",
    success: function(url) {
      var image = $('<img>').attr('src', url).addClass('imdis');
      $('#editor_forum').summernote("insertNode", image[0]);
      console.log(url);
    },
    error: function(data) {
      console.log(data);
    }
  });
}

function deleteImage(src) {
  $.ajax({
    data: {src : src},
    type: "POST",
    url: "{{ route('delete.image') }}",
    cache: false,
    success: function(response) {
      console.log(response);
    }
  });
}
$(document).ready(function(){
  $('.note-modal').appendTo("body");
});
</script>
@endpush
