
import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface SubPageHeaderProps {
  title: string;
  onBack: () => void;
  actions?: React.ReactNode;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({ title, onBack, actions }) => {
  return (
    <header className="bg-emerald-700 text-white shadow-md w-full sticky top-0 z-20 dark:bg-slate-800">
      <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} aria-label="Go back" className="p-1 -ml-1">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center space-x-0">
          {actions}
        </div>
      </div>
    </header>
  );
};

export default SubPageHeader;