import React from 'react';

interface FlagProgressBarProps {
  progress: number;
}

const PalestineFlagProgressBar: React.FC<FlagProgressBarProps> = ({ progress }) => {
  const clipId = `clip-palestine-${Math.random()}`;
  const progressWidth = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full rounded overflow-hidden" style={{ aspectRatio: '2 / 1' }}>
        <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
            <defs>
                <g id="palestine-grayscale">
                    <rect width="300" height="50" y="0" fill="#707070" /> 
                    <rect width="300" height="50" y="50" fill="#D3D3D3" />
                    <rect width="300" height="50" y="100" fill="#909090" />
                    <path d="M 0,0 L 100,75 L 0,150 Z" fill="#A0A0A0"/>
                </g>
                <g id="palestine-color">
                    <rect width="300" height="50" y="0" fill="black" />
                    <rect width="300" height="50" y="50" fill="white" />
                    <rect width="300" height="50" y="100" fill="#007a3d" />
                    <path d="M 0,0 L 100,75 L 0,150 Z" fill="#ce1126"/>
                </g>
                <clipPath id={clipId}>
                    <rect x="0" y="0" width={`${progressWidth}%`} height="150" />
                </clipPath>
            </defs>

            <use href="#palestine-grayscale" />
            <use href="#palestine-color" clipPath={`url(#${clipId})`} />
            <rect x="0" y="0" width="300" height="150" fill="none" stroke="#9ca3af" strokeWidth="2" />
        </svg>
    </div>
  );
};

export default PalestineFlagProgressBar;
