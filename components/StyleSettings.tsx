import React, { useState, useEffect } from 'react';
import SubPageHeader from './SubPageHeader';
import ChevronRightIcon from './icons/ChevronRightIcon';
import Modal from './Modal';
import RadioOption from './RadioOption';
import { SettingsData, ProgressBarStyleOption } from '../types';

interface StyleSettingsProps {
  onBack: () => void;
  settings: SettingsData;
  onSettingsChange: (newSettings: Partial<SettingsData>) => void;
}

const StyleSettings: React.FC<StyleSettingsProps> = ({ onBack, settings, onSettingsChange }) => {
    const [isStyleModalOpen, setStyleModalOpen] = useState(false);
    const [tempStyle, setTempStyle] = useState(settings.progressBarStyle);

    useEffect(() => {
        if(isStyleModalOpen) setTempStyle(settings.progressBarStyle);
    }, [isStyleModalOpen, settings.progressBarStyle]);

    const handleSaveStyle = () => {
        onSettingsChange({ progressBarStyle: tempStyle });
        setStyleModalOpen(false);
    }
    
    const SettingsRow = ({ primary, secondary, isClickable = false, children, onClick }: { primary: string; secondary?: string; isClickable?: boolean; children?: React.ReactNode; onClick?: () => void; }) => (
        <div 
            onClick={onClick}
            className={`flex items-center justify-between min-h-[56px] py-3 px-2 -mx-2 border-b border-gray-200 dark:border-slate-700 last:border-b-0 ${isClickable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 rounded' : ''}`}
        >
            <div>
                <div className="text-slate-800 dark:text-slate-200">{primary}</div>
                {secondary && <div className="text-slate-500 dark:text-slate-400 text-sm">{secondary}</div>}
            </div>
            {children}
        </div>
    );

    const ColorPickerRow = ({ label, color, onChange }: { label: string; color: string; onChange: (color: string) => void; }) => (
        <SettingsRow primary={label}>
            <div className="flex items-center space-x-2">
                <span className="font-mono text-sm text-slate-500 dark:text-slate-400">{color}</span>
                <input 
                    type="color" 
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-10 h-10 p-1 bg-transparent border-none rounded-md cursor-pointer"
                    aria-label={`Select color for ${label}`}
                />
            </div>
        </SettingsRow>
    );

  return (
    <>
    {/* Progress Bar Style Modal */}
    <Modal isOpen={isStyleModalOpen} onClose={() => setStyleModalOpen(false)} title="Progress Bar Style">
        <div className="p-4 text-slate-800 dark:text-slate-200 max-h-96 overflow-y-auto">
             {Object.values(ProgressBarStyleOption).map(option => <RadioOption key={option} label={option} isSelected={tempStyle === option} onSelect={() => setTempStyle(option)} />)}
        </div>
        <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-200 dark:bg-slate-700 dark:border-slate-600">
            <button onClick={() => setStyleModalOpen(false)} className="font-bold text-sky-600 hover:text-sky-500">BATAL</button>
            <button onClick={handleSaveStyle} className="font-bold text-sky-600 hover:text-sky-500">OKE</button>
        </div>
    </Modal>
    
    <div className="flex flex-col h-screen font-sans bg-gray-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <SubPageHeader title="Style & Color" onBack={onBack} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4">
            <div className="mt-4 border-t border-gray-200 dark:border-slate-700 pt-1">
                <h3 className="text-sm font-semibold text-sky-600 pt-4 pb-2">Progress Bar</h3>
                <SettingsRow primary="Style" secondary={settings.progressBarStyle} isClickable onClick={() => setStyleModalOpen(true)}>
                    <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                </SettingsRow>
                <ColorPickerRow 
                    label="Bar Color" 
                    color={settings.progressBarColor}
                    onChange={color => onSettingsChange({ progressBarColor: color })}
                />
                <ColorPickerRow 
                    label="Background Color" 
                    color={settings.progressBarBackgroundColor}
                    onChange={color => onSettingsChange({ progressBarBackgroundColor: color })}
                />
            </div>
            <div className="mt-4 border-t border-gray-200 dark:border-slate-700 pt-1">
                <h3 className="text-sm font-semibold text-sky-600 pt-4 pb-2">Text</h3>
                 <ColorPickerRow 
                    label="Item Text Color" 
                    color={settings.itemTextColor}
                    onChange={color => onSettingsChange({ itemTextColor: color })}
                />
            </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default StyleSettings;
