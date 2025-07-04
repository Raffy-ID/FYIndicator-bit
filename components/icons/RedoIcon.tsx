
import React from 'react';

interface IconProps {
    className?: string;
}

const RedoIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "w-6 h-6"}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.76 0-8.87 3.03-10.28 7.22l2.37.78C4.95 12.31 7.96 10 11.5 10c1.96 0 3.73.72 5.12 1.88L13 15h9V6l-3.6 3.6z" />
  </svg>
);

export default RedoIcon;
