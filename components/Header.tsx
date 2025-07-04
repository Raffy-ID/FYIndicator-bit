
import React from 'react';
import PlusIcon from './icons/PlusIcon';
import DotsVerticalIcon from './icons/DotsVerticalIcon';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';

interface HeaderProps {
  onAddClick: () => void;
  onSettingsClick: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Header: React.FC<HeaderProps> = ({ onAddClick, onSettingsClick, onUndo, onRedo, canUndo, canRedo }) => {
  return (
    <header className="bg-emerald-700 text-white shadow-md w-full sticky top-0 z-10 dark:bg-slate-800">
      <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">FYndicator bit</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {canUndo && (
            <button onClick={onUndo} aria-label="Undo" className="p-2 -m-2">
              <UndoIcon className="w-6 h-6" />
            </button>
          )}
          {canRedo && (
            <button onClick={onRedo} aria-label="Redo" className="p-2 -m-2">
              <RedoIcon className="w-6 h-6" />
            </button>
          )}
          <button onClick={onAddClick} aria-label="Add new progress bar" className="p-2 -m-2">
            <PlusIcon className="w-6 h-6" />
          </button>
           <button onClick={onSettingsClick} aria-label="More options" className="p-2 -m-2">
            <DotsVerticalIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
