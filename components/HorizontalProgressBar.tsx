import React from 'react';
import { ItemStatus } from '../types';

interface HorizontalProgressBarProps {
    progress: number;
    status: ItemStatus;
    color?: string;
    backgroundColor?: string;
    textColor?: string;
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({ progress, status, color, backgroundColor, textColor }) => {
    const defaultProgressColor = status === ItemStatus.Completed ? '#22c55e' : '#38bdf8'; // emerald-500, sky-500
    const progressColor = color || defaultProgressColor;
    const defaultBackgroundColor = document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0'; // slate-700, slate-200
    const trackColor = backgroundColor || defaultBackgroundColor;
    const defaultTextColor = document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569'; // slate-400, slate-600
    const finalTextColor = textColor || defaultTextColor;
    const percentColor = color || (status === ItemStatus.Completed ? '#22c55e' : '#38bdf8');

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium" style={{ color: finalTextColor }}>Progress</span>
                <span className={`text-sm font-medium`} style={{color: percentColor }}>
                    {progress.toFixed(0)}%
                </span>
            </div>
            <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: trackColor }}>
                <div
                    className={`h-3 rounded-full transition-all duration-300 ease-in-out`}
                    style={{ width: `${Math.min(100, progress)}%`, backgroundColor: progressColor }}
                ></div>
            </div>
        </div>
    );
};

export default HorizontalProgressBar;
