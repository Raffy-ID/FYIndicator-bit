
import React from 'react';

interface IconProps {
    className?: string;
    style?: React.CSSProperties;
}

const CheckIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "w-6 h-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    style={style}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default CheckIcon;
