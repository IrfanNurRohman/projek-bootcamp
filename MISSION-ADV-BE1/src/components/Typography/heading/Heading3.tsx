import React from 'react';

import type { HeadingProps } from '../../../types/heading';

const Heading3: React.FC<HeadingProps> = ({ children, className = '' }) => (
  <h3 className={`font-poppins font-bold text-[#222325] leading-[110%] text-[24px] sm:text-[32px] ${className}`}>
    {children}
  </h3>
);

export default Heading3;