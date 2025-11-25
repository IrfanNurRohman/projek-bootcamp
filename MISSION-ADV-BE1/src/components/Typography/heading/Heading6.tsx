import React from 'react';

import type { HeadingProps } from '../../../types/heading';

const Heading6: React.FC<HeadingProps> = ({ children, className = '' }) => (
  <h6 className={`font-poppins font-bold text-[#222325] leading-[110%] text-[16px] sm:text-[20px] ${className}`}>
    {children}
  </h6>
);

export default Heading6;