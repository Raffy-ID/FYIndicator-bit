import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, ariaLabel }) => {
  return (
    <label htmlFor={ariaLabel} className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          id={ariaLabel}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-label={ariaLabel}
        />
        <div className={`block w-14 h-8 rounded-full transition-colors ${checked ? 'bg-sky-500' : 'bg-gray-300 dark:bg-slate-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;