// import React from 'react';
import { useMemo } from 'react';
import { RatingStars } from './RatingStars';

type CourseType = {
    courseImage: string
    avatarImage: string
    courseName: string
    instructorName: string
    instructorJob: string
    instructorCompany?: string
    rating: number
    reviewCount: number
    price: string
    onClick?: () => void // Optional click handler
}

const CourseCard = ({ courseImage, avatarImage, courseName, instructorName, instructorJob, instructorCompany, rating, reviewCount, price, onClick }: CourseType) => {
    const ratingStars = useMemo(() => <RatingStars rating={rating} reviewCount={reviewCount} />, [rating, reviewCount]);


    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full mx-auto"
            onClick={() => {
                if (onClick) onClick(); // Call the onClick handler if provided
            }}>
            {/* Image */}

            <div className="p-4 flex flex-row md:flex-col gap-4 items-center md:items-start">

                <img
                    src={courseImage}
                    alt="Course Thumbnail"
                    className="w-[82px] h-[82px] md:w-[344px] md:h-[193px] rounded-md object-cover"
                />

                <div>
                    <h3 className="font-semibold text-[16px] mb-1">{courseName}</h3>

                    <div className="flex flex-row items-center gap-2 mb-2">
                        <img
                            src={avatarImage}
                            alt="Avatar"
                            className="w-[40px] h-[40px] rounded-sm object-cover"
                        />
                        <div>
                            <h2 className="text-[16px] font-semibold text-gray-800">{instructorName}</h2>
                            {/* <p className="text-[14px] text-gray-600 mb-3">{instructorJob} di {instructorCompany} </p> */}
                            <p className="text-[14px] text-gray-600 mb-3">
                                {instructorJob} di
                                <span className="font-semibold hidden md:inline"> {instructorCompany}</span>
                            </p>
                        </div>
                    </div>

                </div>


            </div>
            {/* Image */}


            {/* Content */}
            <div className="px-4 mb-4 flex flex-row gap-4 justify-between items-center">

                {ratingStars}
                <div className="text-green-600 font-semibold text-lg">{price}</div>
            </div>
        </div>
    );
};

export default CourseCard;


