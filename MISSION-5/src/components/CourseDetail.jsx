import React from 'react';
import { useParams } from 'react-router-dom';

// Data kursus sementara, bisa diganti dengan data dari API
const courseData = [
  {
    id: 1,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: '/path/to/image1.jpg',
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    price: 'Rp 300K'
  },
  {
    id: 1,
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...',
    image: '/path/to/image1.jpg',
    authorName: 'Jenna Ortega',
    authorTitle: 'Senior Accountant at Gojek',
    rating: 4.5,
    price: 'Rp 300K'
  },
  // Add other courses here...
];

const CourseDetail = () => {
  // Mendapatkan ID kursus dari URL menggunakan useParams
  const { id } = useParams();

  // Mencari course berdasarkan ID
  const course = courseData.find(course => course.id.toString() === id);

  if (!course) {
    return <div>Kursus tidak ditemukan</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6 mt-12">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-md" />
        <h4 className="text-2xl font-semibold mt-4">{course.title}</h4>
        <p className="mt-2 text-gray-500">{course.description}</p>
        <div className="flex items-center mt-4">
          <img src="/path/to/author-image.jpg" alt={course.authorName} className="w-10 h-10 rounded-full mr-3" />
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
            <span className="ml-2 text-sm">({course.reviews || '0'})</span>
          </div>
          <span className="text-lg font-bold text-green-600">{course.price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
