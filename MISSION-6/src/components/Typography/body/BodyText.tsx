import React from 'react';

type BodySize = 'large' | 'medium' | 'small';
type BodyWeight = 'bold' | 'semibold' | 'medium' | 'regular';

interface BodyTextProps {
  children: React.ReactNode;
  size?: BodySize;
  weight?: BodyWeight;
  className?: string;
}

const sizeMap: Record<BodySize, string> = {
  large: 'text-[18px]',
  medium: 'text-[16px]',
  small: 'text-[14px]',
};

const weightMap: Record<BodyWeight, string> = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  regular: 'font-normal',
};

const BodyText: React.FC<BodyTextProps> = ({
  children,
  size = 'medium',
  weight = 'regular',
  className = '',
}) => {
  const sizeClass = sizeMap[size];
  const weightClass = weightMap[weight];

  return (
    <p
      className={`font-dm-sans ${sizeClass} ${weightClass} leading-[110%] text-[#222325] ${className}`}
    >
      {children}
    </p>
  );
};

export default BodyText;