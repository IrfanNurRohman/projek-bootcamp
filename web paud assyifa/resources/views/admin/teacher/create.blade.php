@extends('admin.layouts.app')

@section('content')
<section class="section">
	<div class="section-header">
		<div class="section-header-back">
			<a href="#" class="btn btn-icon"><i class="fas fa-arrow-left"></i></a>
		</div>
		<h1 class="m-0 text-dark">Add New Event</h1>
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

						<form action="{{ route('admin.teacher.store') }}" method="post" enctype="multipart/form-data">
							@csrf
							<div class="form-group">
								<label for="">Name</label>
								<input type="text" name="name" class="form-control @error('name') is-invalid @enderror" required>
								@error('name')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
							</div>
						   <div class="form-group">
							<label for="">Pengajar</label>
								<input type="text" name="course" class="form-control @error('course') is-invalid @enderror" required>
									@error('course')
									<span class="invalid-feedback" role="alert">
									    <strong>{{ $message }}</strong>
									</span>
									@enderror
							</div>
						   <div class="form-group">
							<label for="">Facebook</label>
							    <input type="text" name="facebook" value="none" class="form-control @error('facebook') is-invalid @enderror">
								@error('facebook')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
								</div>
							<div class="form-group">
								<label for="">Instagram</label>
									<input type="text" name="instagram" value="none" class="form-control @error('instagram') is-invalid @enderror">
									@error('instagram')
									<span class="invalid-feedback" role="alert">
				     					<strong>{{ $message }}</strong>
									</span>
									@enderror
							</div>
							<div class="form-group">
								<label for="customFile">{{ __('Upload Photo') }}</label>
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
@push('javascript')
<script src="{{ asset('package/selectric/public/jquery.selectric.min.js') }}"></script>
@endpush
