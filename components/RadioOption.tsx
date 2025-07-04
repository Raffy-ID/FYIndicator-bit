
import React from 'react';

interface RadioOptionProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, isSelected, onSelect }) => {
  const a11yId = `radio-option-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <label
      htmlFor={a11yId}
      className="flex items-center space-x-4 py-3 cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative flex items-center justify-center w-6 h-6">
        <input
          id={a11yId}
          type="radio"
          name="radio-group" // Group options together
          checked={isSelected}
          onChange={onSelect}
          className="sr-only"
        />
        {/* Outer circle */}
        <div
          className={`w-6 h-6 rounded-full border-2 transition-colors ${
            isSelected ? 'border-emerald-500 dark:border-emerald-600' : 'border-gray-400 dark:border-slate-500'
          }`}
        ></div>
        {/* Inner circle (dot) */}
        {isSelected && (
          <div className="absolute w-3.5 h-3.5 bg-emerald-500 dark:bg-emerald-600 rounded-full transition-all"></div>
        )}
      </div>
      <span className="text-lg text-slate-800 dark:text-slate-200">{label}</span>
    </label>
  );
};

export default RadioOption;