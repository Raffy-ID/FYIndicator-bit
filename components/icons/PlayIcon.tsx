
import React from 'react';

interface IconProps {
    className?: string;
}

const PlayIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className || "w-8 h-8"}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M8 5v14l11-7z" />
    </svg>
);

export default PlayIcon;
