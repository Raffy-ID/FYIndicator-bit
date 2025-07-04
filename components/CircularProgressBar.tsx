import React from 'react';
import { ItemStatus } from '../types';
import CheckIcon from './icons/CheckIcon';

interface CircularProgressBarProps {
  progress: number;
  status: ItemStatus;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  status,
  size = 160,
  strokeWidth = 12,
  color,
  backgroundColor,
  textColor,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const defaultProgressColor = status === ItemStatus.Completed ? '#22c55e' : '#38bdf8'; // emerald-500, sky-500
  const progressColor = color || defaultProgressColor;
  const defaultBackgroundColor = document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0'; // slate-700, slate-200
  const trackColor = backgroundColor || defaultBackgroundColor;
  const defaultTextColor = document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#1e293b';
  const finalTextColor = textColor || defaultTextColor;
  const completedIconColor = color || '#22c55e';


  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          stroke={trackColor}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="transition-all duration-300 ease-in-out"
          stroke={progressColor}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {status === ItemStatus.Completed ? (
          <CheckIcon className="w-16 h-16" style={{ color: completedIconColor }} />
        ) : (
          <span className="text-4xl font-mono font-bold" style={{ color: finalTextColor }}>
            {Math.round(progress)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularProgressBar;
