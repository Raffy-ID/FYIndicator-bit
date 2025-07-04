
import React from 'react';

interface IconProps {
    className?: string;
}

const RefreshIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "w-6 h-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h5M20 20v-5h-5M4 4a8 8 0 0113.59 4.79M20 20a8 8 0 00-13.59-4.79"
    />
  </svg>
);

export default RefreshIcon;
