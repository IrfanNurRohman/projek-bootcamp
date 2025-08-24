import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import imageBeranda from '../assets/image_beranda.jpg'
import newsLetter from '../assets/beranda_footer.jpg'
import cardGrid1 from '../assets/1a.jpg';
import cardGrid2 from '../assets/2a.jpg';
import cardGrid3 from '../assets/3a.jpg';
import cardGrid4 from '../assets/4a.jpg';
import cardGrid5 from '../assets/5a.jpg';
import cardGrid6 from '../assets/6a.jpg';
import cardGrid7 from '../assets/7a.jpg';
import cardGrid8 from '../assets/8a.jpg';
import cardGrid9 from '../assets/9a.jpg';
import author1 from '../assets/1.png';
import author2 from '../assets/2.png';
import author3 from '../assets/3.png';
import author4 from '../assets/4.png';
import author5 from '../assets/5.png';
import author6 from '../assets/6.png';
import author7 from '../assets/7.png';
import author8 from '../assets/8.png';

const courseData = [
  {
    id: 1,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: cardGrid1,
    authorImage: author1,
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    reviews: 86,
    price: 'Rp 300K',
    link: './course/1', // URL for the detailed course page
  },
{
    id: 2,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: cardGrid2,
    authorImage: author2,
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    reviews: 86,
    price: 'Rp 300K',
    link: './course/1', // URL for the detailed course page
  },
  {
    id: 3,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: cardGrid3,
    authorImage: author3,
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    reviews: 86,
    price: 'Rp 300K',
    link: './course/1', // URL for the detailed course page
  },
  {
    id: 4,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: cardGrid4,
    authorImage: author4,
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    reviews: 86,
    price: 'Rp 300K',
    link: './course/1', // URL for the detailed course page
  },
  {
    id: 5,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: cardGrid5,
    authorImage: author5,
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    reviews: 86,
    price: 'Rp 300K',
    link: './course/1', // URL for the detailed course page
  },
  {
    id: 6,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: cardGrid6,
    authorImage: author6,
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    reviews: 86,
    price: 'Rp 300K',
    link: './course/1', // URL for the detailed course page
  },
  {
    id: 7,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: cardGrid7,
    authorImage: author7,
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    reviews: 86,
    price: 'Rp 300K',
    link: './course/1', // URL for the detailed course page
  },
  {
    id: 8,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: cardGrid8,
    authorImage: author8,
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    reviews: 86,
    price: 'Rp 300K',
    link: './course/1', // URL for the detailed course page
  },
  {
    id: 9,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: cardGrid9,
    authorImage: author1,
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    reviews: 86,
    price: 'Rp 300K',
    link: './course/1', // URL for the detailed course page
  },
  // Add more course data here...
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to handle click on a course card
  const handleCourseClick = (courseLink) => {
    navigate(courseLink);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-[140px] pt-[40px]">
      {/* Banner */}
      <div className="relative bg-cover bg-center p-16 rounded-b-lg shadow-lg" style={{ backgroundImage: `url(${imageBeranda})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold">
            Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
          </h1>
          <p className="mt-4 text-sm sm:text-base">
            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu,
            Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
          </p>
          <button className="mt-6 bg-green-700 text-white px-6 py-3 rounded-md">
            Temukan Video Course untuk Dipelajari!
          </button>
        </div>
      </div>

      {/* Featured Learning Section */}
      <div className="max-w-screen-xl mx-auto p-6 mt-12">
        <h3 className="text-[30px] sm:text-[35px] font-semibold text-gray-800">Koleksi Video Pembelajaran Unggulan</h3>
        <p className="mt-2 text-gray-500">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
      </div>

      {/* Category Buttons */}
      <div className="text-left mb-1 mt-6">
        <div className="inline-flex flex-wrap gap-4">
          <button className="text-sm font-medium text-gray-600 hover:text-green-600 focus:outline-none" id="allClassesBtn">
            Semua Kelas
          </button>
          <button className="text-sm font-medium text-gray-600 hover:text-green-600 focus:outline-none" id="marketingBtn">
            Pemasaran
          </button>
          <button className="text-sm font-medium text-gray-600 hover:text-green-600 focus:outline-none" id="designBtn">
            Desain
          </button>
          <button className="text-sm font-medium text-gray-600 hover:text-green-600 focus:outline-none" id="selfDevBtn">
            Pengembangan Diri
          </button>
          <button className="text-sm font-medium text-gray-600 hover:text-green-600 focus:outline-none" id="businessBtn">
            Bisnis
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {courseData.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleCourseClick(course.link)} // Handle click event to navigate
          >
            <img src={course.image} alt="course" className="w-full h-40 object-cover rounded-md" />
            <h4 className="text-lg font-semibold mt-4">{course.title}</h4>
            <p className="mt-2 text-gray-500">{course.description}</p>
            <div className="flex items-center mt-4">
              <img src={course.authorImage} alt="author" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="text-sm font-semibold">{course.authorName}</p>
                <p className="text-xs text-gray-400">{course.authorTitle}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-yellow-500">
                  {'⭐'.repeat(Math.floor(course.rating))}{'☆'.repeat(5 - Math.floor(course.rating))}
                </span>
                <span className="ml-2 text-sm">({course.reviews})</span>
              </div>
              <span className="text-lg font-bold text-green-600">{course.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="bg-orange-100 text-center py-16 mt-12 rounded-lg shadow-md" style={{ backgroundImage: `url(${newsLetter})` }}>
        <h3 className="text-2xl text-white font-bold">Mau Belajar Lebih Banyak?</h3>
        <p className="mt-2 text-lg text-white">
          Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id
        </p>
        <div className="mt-6 flex justify-center">
          <input type="email" placeholder="Masukkan Emailmu" className="px-4 py-2 border rounded-l-lg focus:outline-none" />
          <button className="bg-[#FFBD3A] text-white px-6 py-2 rounded-r-lg hover:bg-[#FFBD3A]">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
