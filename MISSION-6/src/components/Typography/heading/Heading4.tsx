import React from 'react';

import type { HeadingProps } from '../../../types/heading';

const Heading4: React.FC<HeadingProps> = ({ children, className = '' }) => (
  <h4 className={`font-poppins font-bold text-[#222325] leading-[110%] text-[20px] sm:text-[28px] ${className}`}>
    {children}
  </h4>
);

export default Heading4;