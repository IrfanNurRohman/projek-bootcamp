import React from 'react';

import type { HeadingProps } from '../../../types/heading';

const Heading5: React.FC<HeadingProps> = ({ children, className = '' }) => (
  <h5 className={`font-poppins font-bold text-[#222325] leading-[110%] text-[18px] sm:text-[24px] ${className}`}>
    {children}
  </h5>
);

export default Heading5;