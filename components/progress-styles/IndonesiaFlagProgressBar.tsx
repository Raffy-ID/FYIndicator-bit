import React from 'react';

interface FlagProgressBarProps {
  progress: number;
}

const IndonesiaFlagProgressBar: React.FC<FlagProgressBarProps> = ({ progress }) => {
  const clipId = `clip-indonesia-${Math.random()}`;
  const progressWidth = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full rounded overflow-hidden" style={{ aspectRatio: '2 / 1' }}>
        <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
            <defs>
                <g id="indonesia-grayscale">
                    <rect width="300" height="75" fill="#808080" />
                    <rect y="75" width="300" height="75" fill="#D3D3D3" />
                </g>
                <g id="indonesia-color">
                    <rect width="300" height="75" fill="#FF0000" />
                    <rect y="75" width="300" height="75" fill="#FFFFFF" />
                </g>
                <clipPath id={clipId}>
                    <rect x="0" y="0" width={`${progressWidth}%`} height="150" />
                </clipPath>
            </defs>

            <use href="#indonesia-grayscale" />
            <use href="#indonesia-color" clipPath={`url(#${clipId})`} />
             <rect x="0" y="0" width="300" height="150" fill="none" stroke="#9ca3af" strokeWidth="2" />
        </svg>
    </div>
  );
};

export default IndonesiaFlagProgressBar;
