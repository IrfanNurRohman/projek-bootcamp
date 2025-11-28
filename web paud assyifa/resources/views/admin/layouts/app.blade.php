@extends('admin.layouts.skeleton')

@php
header("X-Frame-Options: DENY");
header("Content-Security-Policy: frame-ancestors 'none'", false);
@endphp

@section('app')
	<div class="main-wrapper">
		<div class="navbar-bg" style="background-color: #34baeb;"></div>
		@if(Session::has('login'))
    <nav class="navbar navbar-expand-lg main-navbar">
			@include('admin.partials.navbar')
		</nav>
		<div class="main-sidebar">
			@include('admin.partials.sidebar')
		</div>
    @else
		@endif
		<!-- Main Content -->
		<div class="main-content">
			@yield('content')
		</div>
		<footer class="main-footer">
			@include('admin.partials.footer')
		</footer>
	</div>
@endsection
