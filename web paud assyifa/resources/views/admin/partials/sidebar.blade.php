<aside id="sidebar-wrapper">
	<div class="sidebar-brand sidebar-brand-sm">
		<a href="index.html">{{ strtoupper(substr(env('APP_NAME'), 0, 2)) }}</a>
	</div>
	<ul class="sidebar-menu">
		<li class="menu-header">Admin</li>
		<li class="nav-item"><a href="{{ route('admin.dashboard') }}" class="nav-link"><i class="fas fa-fire"></i><span>Dashboard</span></a>

		<li class="menu-header">Menu</li>
		<li class="nav-item dropdown">
			<a href="#" class="nav-link has-dropdown"><i class="far fa-bookmark"></i><span>Statistik Situs</span></a>
			<ul class="dropdown-menu">
				<li class="nav-item">
					<a href="{{ route('admin.visitor') }}" class="nav-link">
						<span>Trafik pengunjung</span>
					</a>
				</li>
				<li class="nav-item">
					<a href="{{ route('admin.mailer') }}" class="nav-link">
						<span>Kotak masuk</span>
					</a>
				</li>
	     </ul>
		  </li>
			<li class="nav-item dropdown">
				<a href="#" class="nav-link has-dropdown"><i class="far fa-bookmark"></i><span>Profil Situs</span></a>
				<ul class="dropdown-menu">
					<li class="nav-item">
						<a href="{{ route('admin.event') }}" class="nav-link">
							<span>Event</span>
						</a>
					</li>
					<li class="nav-item">
						<a href="{{ route('admin.principal') }}" class="nav-link">
							<span>Sambutan kepala sekolah</span>
						</a>
					</li>
					<li class="nav-item">
						<a href="{{ route('admin.vision') }}" class="nav-link">
							<span>Visi dan misi</span>
						</a>
					</li>
					<li class="nav-item">
						<a href="{{ route('admin.about') }}" class="nav-link">
							<span>About us</span>
						</a>
					</li>
					<li class="nav-item">
						<a href="{{ route('admin.institutions') }}" class="nav-link">
							<span>Lembaga</span>
						</a>
					</li>
					<li class="nav-item">
						<a href="{{ route('admin.galery') }}" class="nav-link">
							<span>Galeri</span>
						</a>
					</li>
					<li class="nav-item">
						<a href="{{ route('admin.blogs') }}" class="nav-link">
							<span>Artikel</span>
						</a>
					</li>
					<li class="nav-item">
						<a href="{{ route('admin.slider') }}" class="nav-link">
							<span>Slider</span>
						</a>
					</li>
					<li class="nav-item">
						<a href="{{ route('admin.teacher') }}" class="nav-link">
							<span>Guru</span>
						</a>
					</li>
		     </ul>
			 </li>
</aside>
