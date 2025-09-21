import React from 'react';

import type { HeadingProps } from '../../../types/heading';

const Heading2: React.FC<HeadingProps> = ({ children, className = '' }) => (
  <h2 className={`font-poppins font-semibold text-[#222325] leading-[110%] text-[28px] sm:text-[40px] ${className}`}>
    {children}
  </h2>
);

export default Heading2;