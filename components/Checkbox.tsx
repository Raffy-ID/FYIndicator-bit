import React from 'react';
import CheckIcon from './icons/CheckIcon';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const a11yId = `checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <label
      htmlFor={a11yId}
      className="flex items-center space-x-4 py-3 cursor-pointer"
    >
      <input
        id={a11yId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors
          ${checked ? 'bg-sky-500' : 'border-2 border-gray-400 dark:border-slate-500'}`}
      >
        {checked && <CheckIcon className="w-5 h-5 text-white" />}
      </div>
      <span className="text-lg text-slate-800 dark:text-slate-200">{label}</span>
    </label>
  );
};

export default Checkbox;