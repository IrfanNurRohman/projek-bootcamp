import React from 'react';

import type { HeadingProps } from '../../../types/heading';

const Heading1: React.FC<HeadingProps> = ({ children, className = '' }) => (
  <h1 className={`font-poppins font-bold text-[#222325] leading-[110%] text-[32px] sm:text-[48px] ${className}`}>
    {children}
  </h1>
);

export default Heading1;