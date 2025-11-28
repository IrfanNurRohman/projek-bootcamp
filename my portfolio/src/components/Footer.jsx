

const Footer = () => {
  return (
    <div className="mt-32 py-4">
    <div className="mt-32 py-4 flex md:flex-row flex-col gap-6 md:gap-0
     justify-between items-center">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <div className="flex gap-7">
            <a href="#beranda">Beranda</a>
            <a href="#tentang">Tentang</a>
            <a href="#proyek">Proyek</a>
            
        </div>
        <div className="flex items-center gap-3">
            <a href="#">
                <i className="ri-github-fill ri-2x"></i>
            </a>
             <a href="#">
                <i className="ri-instagram-fill ri-2x"></i>
            </a>
             <a href="#">
                <i className="ri-facebook-fill ri-2x"></i>
            </a>
            
        </div>     
    </div>
        <div className="mt-6 text-center">
        <p className="text-base opacity-60">
          &copy; 2025. All Rights Reserved. by <span className="font-medium">Irfan Nur Rohman</span>
        </p>
      </div>
    </div>
    
  )
}

export default Footer