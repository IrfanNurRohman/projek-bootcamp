import React from 'react';

import type { ChipProps, ChipType } from '../../types/chip';

const baseStyle = 'px-3 py-1 rounded-full text-[17px] font-medium inline-flex items-center transition ';

const typeMap: Record<ChipType, { bg: string; text: string; border: string }> = {
  success:    { bg: 'bg-[#38D189]', text: 'text-white', border: 'bg-[#38D189]' },
  info:       { bg: 'bg-[#0980E2]',  text: 'text-blue-700',  border: 'bg-[#0980E2]' },
  warning:    { bg: 'bg-yellow-100',text: 'text-yellow-700',border: 'border-yellow-700' },
  error:      { bg: 'bg-red-100',   text: 'text-red-700',   border: 'border-red-700' },
  primary:    { bg: 'bg-indigo-100',text: 'text-indigo-700',border: 'border-indigo-700' },
  secondary:  { bg: 'bg-gray-100',  text: 'text-gray-700',  border: 'border-gray-700' },
};

const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'fill',
  type = 'primary',
  disabled = false,
  className = '',
}) => {
  const styles = typeMap[type];

  const variantStyle = {
    shadow:   `${styles.bg} ${styles.text} shadow-md`,
    fill:     `${styles.bg} text-white`,
    outlined: `bg-transparent ${styles.text} border ${styles.border}`,
  };

  const disabledStyle = 'bg-gray-200 text-gray-400 cursor-not-allowed';

  return (
    <span
      className={`${baseStyle} ${disabled ? disabledStyle : variantStyle[variant]} ${className}`}
    >
      {label}
    </span>
  );
};

export default Chip;