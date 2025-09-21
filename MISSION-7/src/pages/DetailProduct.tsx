import HeaderDashboard from "../components/HeaderDashboard";
// import React from "react";
import Breadcrumb from "../components/molecules/Breadcrumb";
// import BannerCard from "../components/molecules/BannerCard";
import { RatingStars } from "../components/molecules/RatingStars"; // Assuming you have a component for displaying stars
import CoursePromoBanner from "../components/molecules/CoursePromoBanner";
import CourseDescription from "../components/molecules/CourseDescription";
import TutorProfile from "../components/molecules/TutorProfile";

const DetailProduct = () => {
  return (
    <div>
      <HeaderDashboard />

      <div className="container px-4 mx-auto w-full bg-[##fffdf2]">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/dashboard" },
            { label: "Desain", href: "/dashboard" },
            { label: "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager." }, // Aktif, tidak ada href
          ]}
        />
        <div className="relative min-h-[400px] bg-dashboard bg-cover bg-no-repeat text-white shadow-md rounded-lg overflow-hidden flex justify-left text-left mb-6">
          {/* Overlay hanya di gambar */}
          <div className="absolute inset-0 bg-black opacity-80 z-0 rounded-lg" />

          {/* Konten di atas overlay */}
          <div className="w-full relative z-10 py-[24px] md:py-[20px] flex flex-col items-start text-left px-5 md:px-10  justify-center">
            <h2 className="text-[24px] md:text-[48px] font-semibold mb-3 max-w-[240px] md:max-w-[900px] leading-snug">
              <span className="block md:hidden justify-left">
                Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product
                Manager.
              </span>

              <span className="hidden md:inline">
                Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product
                Manager.
              </span>
            </h2>

            <p className="text-white text-[14px] md:text-[16px] mb-6">
              Belajar bersama tutor profesional di Video Course. Kapanpun, di
              manapun.
            </p>

            <RatingStars rating={4.5} reviewCount={120} className="mb-4" />
          </div>
        </div>

        <div className="block md:hidden ">
          <div className="flex flex-col gap-4">
            <CourseDescription />
            <CoursePromoBanner isBanner={true} />
          </div>
          <div>
            <TutorProfile />
          </div>
        </div>

        <div className="hidden md:block">
          <div className="flex flex-row gap-6 ">
            <div className="basis-3/4">
              <CourseDescription />
              <TutorProfile />
            </div>
            <div>
              <CoursePromoBanner isBanner={true} />
            </div>
          </div>
        </div>
        {/* <div className="flex gap-6 w-full lg:flex-row-reverse flex-col md:items-start md:order-2 items-center">

                    <CoursePromoBanner />
                    <div>

                        <CourseDescription content="Foundations of User Experience (UX) Design adalah yang pertama dari rangkaian tujuh kursus yang akan membekali Anda dengan keterampilan yang dibutuhkan untuk melamar pekerjaan tingkat pemula dalam desain pengalaman pengguna. Desainer UX fokus pada interaksi yang dilakukan orang dengan produk seperti situs web, aplikasi seluler, dan objek fisik. Desainer UX membuat interaksi sehari-hari itu dapat digunakan, menyenangkan, dan dapat diakses. Peran seorang desainer UX tingkat pemula mungkin termasuk berempati dengan pengguna, menentukan poin rasa sakit mereka, memunculkan ide untuk solusi desain, membuat wireframe, prototipe, dan maket, dan menguji desain untuk mendapatkan umpan balik." />
                        <TutorProfile />
                    </div>


                </div> */}
      </div>
    </div>
  );
};

export default DetailProduct;
