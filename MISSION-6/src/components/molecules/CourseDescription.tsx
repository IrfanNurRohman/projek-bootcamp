import React from 'react';

type CourseDescriptionProps = {
  title?: string;
  content?: string;
};

const CourseDescription: React.FC<CourseDescriptionProps> = ({
  title = 'Deskripsi',
  content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.`,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-[#333333] w-full md:max-h-[600px]">
      <h3 className="text-[18px] font-semibold mb-3">{title}</h3>
      <p className="text-[14px] text-justify leading-relaxed ">{content}</p>
    </div>
  );
};

export default CourseDescription;