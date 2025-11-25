

type BannerCardProps = {
    // Define any props if needed
    isTop?: boolean; // if the card is top
    heading: string;
    subheading: string;


}

const BannerCard: React.FC<BannerCardProps> = ({ isTop = false, heading, subheading }) => {
    return (
        <div className="relative min-h-[400px] bg-dashboard bg-cover bg-no-repeat text-white shadow-md rounded-lg overflow-hidden flex justify-center text-center mb-6">
            {/* Overlay hanya di gambar */}
            <div className="absolute inset-0 bg-black opacity-60 z-0 rounded-lg" />

            {/* Konten di atas overlay */}
            <div className="relative z-10 px-4 py-[24px] md:py-[20px] flex flex-col items-center text-center">

                {isTop ? null : <p className="text-[16px] text-[#C1C2C4] font-dmsans md:text-base font-semibold mb-1">NEWSLETTER</p>}
                <h2 className="text-[24px] md:text-[48px] font-semibold mb-3 max-w-[240px] md:max-w-[800px] leading-snug">
                    <span>
                        {heading}
                    </span>

                </h2>

                <span className="text-white text-[14px] md:text-[16px] mb-6 max-w-[270px] md:max-w-[480px] lg:max-w-[920px] mx-auto leading-relaxed">
                    {subheading}
                </span>

                {/* <p className="text-white text-[14px] md:text-[16px] mb-6 max-w-[270px] md:max-w-[480px] lg:max-w-[920px] mx-auto leading-relaxed">
                    Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, <br className="hidden md:inline" /> Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
                </p> */}

                <div className="w-full md:max-w-md">
                    {/* Mobile layout: input + tombol terpisah */}
                    <div className="block md:hidden">
                        <div className="bg-white border border-gray-300 rounded-md w-full overflow-hidden">
                            <input
                                type="email"
                                placeholder="Masukkan Emailmu"
                                className="w-full text-sm text-black py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <button className="w-full mt-3 bg-[#FFBD3A] hover:bg-green-700 text-sm text-white py-2 px-6 rounded-md transition duration-300">
                            Subscribe
                        </button>
                    </div>

                    {/* Desktop layout: input + tombol menyatu dengan padding */}
                    <div className="hidden md:flex w-full overflow-hidden rounded-md border border-gray-300 bg-white p-2 gap-2">
                        <input
                            type="email"
                            placeholder="Masukkan Emailmu"
                            className="flex-1 text-sm text-black py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-300 rounded-md"
                        />
                        <button className="bg-[#FFBD3A] hover:bg-green-700 text-sm text-white px-6 py-2 rounded-md transition duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerCard;