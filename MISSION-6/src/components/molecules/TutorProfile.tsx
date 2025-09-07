import React from 'react';
import avatarImage from '../../data/avatarImage';

type TutorCardProps = {
  name: string;
  title: string;
  description: string;
  company?: string; // Optional, if you want to include company name
};

const TutorCard: React.FC<TutorCardProps> = ({ name, title, description, company }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-[#333]">
      <div className='flex items-center mb-4 gap-4'>
        <img
          src={avatarImage[0]} // Assuming avatarImage is an array of image URLs
          alt={name}
          className="w-16 h-16 rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className='flex flex-row items-center'>

            <p className="text-sm text-gray-600">{title} di <span className="font-semibold text-gray-800">{company}</span>
            </p>
          </div>
        </div>
      </div>
      <p className="text-[14px] text-justify leading-relaxed">{description}</p>
    </div>
  );
};

const TutorProfile = () => {
  const tutorInfo = {
    name: 'Gregorius Edrik Lawanto',
    title: 'Senior Talent Acquisition',
    description:
      'Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.',
    company: 'PT Wings Group',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-[#333] w-full md:max-h-[600px] mt-4">
      <div className="">
      <h2 className="text-[18px] font-semibold mt-6">Belajar bersama Tutor Profesional</h2>
        <div className='flex flex-col lg:flex-row gap-4'>

          <TutorCard {...tutorInfo} />
          <TutorCard {...tutorInfo} />
        </div>
        {/* Render the TutorCard with the provided info */}
      </div>
    </div>
  );
};

export default TutorProfile;