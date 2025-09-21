import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios
import courseImage from '../data/courseImage'; // import courseImage from the correct path
import avatarImage from "../data/avatarImage"; // import avatarImage from the correct path
import HeaderDashboard from "../components/HeaderDashboard";
import CourseCard from "../components/molecules/CourseCard";
import BannerCard from "../components/molecules/BannerCard";
import FooterContent from "../components/molecules/FooterContent";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Use localStorage to fetch saved courses when the component is mounted
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []); // The empty dependency array makes this run only once when the component is mounted

  const handleAddCourse = async () => {
    try {
      const response = await axios.get('https://mocki.io/v1/42a35b6f-6314-47d9-bc30-267a4833225d');
      if (response.data === "LOGIN SUCCESS") {
        alert("Successfully logged in.");
        // You can add additional actions here if necessary after a successful login
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      alert("There was an error with the request.");
    }
  };

  return (
    <div>
      <div className="mb-7">
        <HeaderDashboard />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative min-h-[400px] bg-dashboard bg-cover bg-no-repeat text-white shadow-md rounded-lg overflow-hidden flex justify-center text-center mb-6">
          <div className="absolute inset-0 bg-black opacity-60 z-0 rounded-lg" />
          <div className="relative z-10 px-4 py-[24px] md:py-[20px] flex flex-col items-center text-center">
            <h2 className="text-[24px] md:text-[48px] font-semibold mb-3 max-w-[240px] md:max-w-[800px] leading-snug">
              <span className="block md:hidden">
                Revolusi <br /> Pembelajaran: <br />
                Temukan Ilmu Baru melalui Platform Video Interaktif!
              </span>
              <span className="hidden md:inline">
                Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
              </span>
            </h2>
            <p className="text-white text-[14px] md:text-[16px] mb-6 max-w-[270px] md:max-w-[480px] lg:max-w-[920px] mx-auto leading-relaxed">
              Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi.
            </p>
            <button
              className="bg-[#3ECF4C] hover:bg-green-700 text-sm text-white py-2 px-6 rounded-md transition duration-300"
              onClick={() => navigate("/all-products")}
            >
              Temukan Video Course untuk Dipelajari!
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Kelola Video Pembelajaran Unggulan</h2>
        <p className="text-[#333333AD] text-sm md:text-base mb-4 md:mb-8">
          Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
        </p>

        <div className="bg-[#fdfbf5] mb-6 md:mb-8">
          <div className="category-buttons flex-nowrap flex justify-start gap-4 md:gap-6 px-4 py-3 md:py-4 text-xs md:text-sm font-medium overflow-x-auto scrollbar-hide">
            <button className="text-[#f25c05] relative pb-1 px-1 md:px-0 whitespace-nowrap">
              Semua Kelas
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f25c05] rounded-full"></span>
            </button>
            <button className="text-gray-500 hover:text-black transition px-1 md:px-0 whitespace-nowrap">
              Pemasaran
            </button>
            <button className="text-gray-500 hover:text-black transition px-1 md:px-0 whitespace-nowrap">
              Desain
            </button>
            <button className="text-gray-500 hover:text-black transition px-1 md:px-0 whitespace-nowrap">
              Pengembangan Diri
            </button>
            <button className="text-gray-500 hover:text-black transition px-1 md:px-0 whitespace-nowrap">
              Bisnis
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Render CourseCard components from localStorage */}
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseCard
                key={index}
                courseImage={courseImage[course.courseImageIndex]}
                avatarImage={avatarImage[course.avatarImageIndex]}
                courseName={course.courseName}
                instructorName={course.instructorName}
                instructorJob={course.instructorJob}
                instructorCompany={course.instructorCompany}
                rating={course.rating}
                reviewCount={course.reviewCount}
                price={course.price}
                onClick={() => navigate("/detail-product")}
              />
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </div>

        <BannerCard heading="Mau Belajar Lebih Banyak ?" subheading="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik harisenin.com" />
        <FooterContent />
      </div>
      
      {/* Button to trigger 'Add' functionality */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6"
        onClick={handleAddCourse} // Call the function when the button is clicked
      >
        Tambah
      </button>
    </div>
  );
};

export default Dashboard;
