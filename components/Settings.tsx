
import React, { useState, useEffect } from 'react';
import SubPageHeader from './SubPageHeader';
import ToggleSwitch from './ToggleSwitch';
import ChevronRightIcon from './icons/ChevronRightIcon';
import Modal from './Modal';
import RadioOption from './RadioOption';
import { SettingsData, DateFormatOption, StartOfWeekOption, WidgetRefreshRateOption, WidgetTextColorOption, ThemeOption } from '../types';

interface SettingsProps {
  onBack: () => void;
  settings: SettingsData;
  onSettingsChange: (newSettings: Partial<SettingsData>) => void;
  onShowStyleSettings: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, settings, onSettingsChange, onShowStyleSettings }) => {
    const [widgetBackground, setWidgetBackground] = useState(false);
    
    // Modal States
    const [isDateFormatModalOpen, setDateFormatModalOpen] = useState(false);
    const [isStartOfWeekModalOpen, setStartOfWeekModalOpen] = useState(false);
    const [isRefreshRateModalOpen, setRefreshRateModalOpen] = useState(false);
    const [isTextColorModalOpen, setTextColorModalOpen] = useState(false);
    const [isThemeModalOpen, setThemeModalOpen] = useState(false);

    // Temp states for modals
    const [tempDateFormat, setTempDateFormat] = useState(settings.dateFormat);
    const [tempStartOfWeek, setTempStartOfWeek] = useState(settings.startOfWeek);
    const [tempRefreshRate, setTempRefreshRate] = useState(settings.widgetRefreshRate);
    const [tempTextColor, setTempTextColor] = useState(settings.widgetTextColor);
    const [tempTheme, setTempTheme] = useState(settings.theme);
    
    useEffect(() => { if(isDateFormatModalOpen) setTempDateFormat(settings.dateFormat); }, [isDateFormatModalOpen, settings.dateFormat]);
    useEffect(() => { if(isStartOfWeekModalOpen) setTempStartOfWeek(settings.startOfWeek); }, [isStartOfWeekModalOpen, settings.startOfWeek]);
    useEffect(() => { if (isRefreshRateModalOpen) setTempRefreshRate(settings.widgetRefreshRate); }, [isRefreshRateModalOpen, settings.widgetRefreshRate]);
    useEffect(() => { if (isTextColorModalOpen) setTempTextColor(settings.widgetTextColor); }, [isTextColorModalOpen, settings.widgetTextColor]);
    useEffect(() => { if(isThemeModalOpen) setTempTheme(settings.theme); }, [isThemeModalOpen, settings.theme]);

    const handleSaveDateFormat = () => { onSettingsChange({ dateFormat: tempDateFormat }); setDateFormatModalOpen(false); };
    const handleSaveStartOfWeek = () => { onSettingsChange({ startOfWeek: tempStartOfWeek }); setStartOfWeekModalOpen(false); };
    const handleSaveRefreshRate = () => { onSettingsChange({ widgetRefreshRate: tempRefreshRate }); setRefreshRateModalOpen(false); };
    const handleSaveTextColor = () => { onSettingsChange({ widgetTextColor: tempTextColor }); setTextColorModalOpen(false); };
    const handleSaveTheme = () => { onSettingsChange({ theme: tempTheme }); setThemeModalOpen(false); };

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

  return (
    <>
    {/* Date Format Modal */}
    <Modal isOpen={isDateFormatModalOpen} onClose={() => setDateFormatModalOpen(false)} title="Date format">
        <div className="p-4 text-slate-800 dark:text-slate-200">
             <RadioOption label={DateFormatOption.LocaleDefault} isSelected={tempDateFormat === DateFormatOption.LocaleDefault} onSelect={() => setTempDateFormat(DateFormatOption.LocaleDefault)} />
             <RadioOption label={DateFormatOption.YYYYMMDD} isSelected={tempDateFormat === DateFormatOption.YYYYMMDD} onSelect={() => setTempDateFormat(DateFormatOption.YYYYMMDD)} />
        </div>
        <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-200 dark:bg-slate-700 dark:border-slate-600">
            <button onClick={() => setDateFormatModalOpen(false)} className="font-bold text-sky-600 hover:text-sky-500">BATAL</button>
            <button onClick={handleSaveDateFormat} className="font-bold text-sky-600 hover:text-sky-500">OKE</button>
        </div>
    </Modal>
    
    {/* Start of the Week Modal */}
    <Modal isOpen={isStartOfWeekModalOpen} onClose={() => setStartOfWeekModalOpen(false)} title="Start of the week">
        <div className="p-4 text-slate-800 dark:text-slate-200">
             {Object.values(StartOfWeekOption).map(option => <RadioOption key={option} label={option} isSelected={tempStartOfWeek === option} onSelect={() => setTempStartOfWeek(option)} />)}
        </div>
        <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-200 dark:bg-slate-700 dark:border-slate-600">
            <button onClick={() => setStartOfWeekModalOpen(false)} className="font-bold text-sky-600 hover:text-sky-500">BATAL</button>
            <button onClick={handleSaveStartOfWeek} className="font-bold text-sky-600 hover:text-sky-500">OKE</button>
        </div>
    </Modal>

    {/* Widget Refresh Rate Modal */}
    <Modal isOpen={isRefreshRateModalOpen} onClose={() => setRefreshRateModalOpen(false)} title="Desktop widget refresh rate">
        <div className="p-4 text-slate-800 dark:text-slate-200">
            {Object.values(WidgetRefreshRateOption).map(option => <RadioOption key={option} label={option} isSelected={tempRefreshRate === option} onSelect={() => setTempRefreshRate(option)} />)}
        </div>
        <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-200 dark:bg-slate-700 dark:border-slate-600">
            <button onClick={() => setRefreshRateModalOpen(false)} className="font-bold text-sky-600 hover:text-sky-500">BATAL</button>
            <button onClick={handleSaveRefreshRate} className="font-bold text-sky-600 hover:text-sky-500">OKE</button>
        </div>
    </Modal>

    {/* Text Color Modal */}
    <Modal isOpen={isTextColorModalOpen} onClose={() => setTextColorModalOpen(false)} title="Desktop widget text color">
        <div className="p-4 text-slate-800 dark:text-slate-200">
            {Object.values(WidgetTextColorOption).map(option => <RadioOption key={option} label={option} isSelected={tempTextColor === option} onSelect={() => setTempTextColor(option)} />)}
        </div>
        <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-200 dark:bg-slate-700 dark:border-slate-600">
            <button onClick={() => setTextColorModalOpen(false)} className="font-bold text-sky-600 hover:text-sky-500">BATAL</button>
            <button onClick={handleSaveTextColor} className="font-bold text-sky-600 hover:text-sky-500">OKE</button>
        </div>
    </Modal>

    {/* Day/Night Theme Modal */}
    <Modal isOpen={isThemeModalOpen} onClose={() => setThemeModalOpen(false)} title="Day / Night Theme">
        <div className="p-4 text-slate-800 dark:text-slate-200">
            {Object.values(ThemeOption).map(option => <RadioOption key={option} label={option} isSelected={tempTheme === option} onSelect={() => setTempTheme(option)} /> )}
        </div>
        <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-200 dark:bg-slate-700 dark:border-slate-600">
            <button onClick={() => setThemeModalOpen(false)} className="font-bold text-sky-600 hover:text-sky-500">BATAL</button>
            <button onClick={handleSaveTheme} className="font-bold text-sky-600 hover:text-sky-500">OKE</button>
        </div>
    </Modal>
    
    <div className="flex flex-col h-screen font-sans bg-gray-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <SubPageHeader title="Settings" onBack={onBack} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4">
          <SettingsRow primary="Date format" secondary={settings.dateFormat} isClickable onClick={() => setDateFormatModalOpen(true)}>
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </SettingsRow>
          <SettingsRow primary="Start of the week" secondary={settings.startOfWeek} isClickable onClick={() => setStartOfWeekModalOpen(true)}>
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </SettingsRow>
          <SettingsRow primary="Notification settings" isClickable >
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </SettingsRow>
          
          <div className="mt-4 border-t border-gray-200 dark:border-slate-700 pt-1">
            <SettingsRow primary="Desktop widget refresh rate" secondary={settings.widgetRefreshRate} isClickable onClick={() => setRefreshRateModalOpen(true)}>
                <ChevronRightIcon className="w-5 h-5 text-slate-400" />
            </SettingsRow>
            <SettingsRow primary="Desktop widget text color" secondary={settings.widgetTextColor} isClickable onClick={() => setTextColorModalOpen(true)}>
                <ChevronRightIcon className="w-5 h-5 text-slate-400" />
            </SettingsRow>
            <SettingsRow primary="Desktop widget background">
                <ToggleSwitch checked={widgetBackground} onChange={setWidgetBackground} ariaLabel="Desktop widget background" />
            </SettingsRow>
          </div>
          
          <div className="mt-4 border-t border-gray-200 dark:border-slate-700 pt-1">
            <SettingsRow primary="Day / Night Theme" secondary={settings.theme} isClickable onClick={() => setThemeModalOpen(true)}>
                <ChevronRightIcon className="w-5 h-5 text-slate-400" />
            </SettingsRow>
            <SettingsRow primary="Style & Color" secondary="Customize progress bars" isClickable onClick={onShowStyleSettings}>
                <ChevronRightIcon className="w-5 h-5 text-slate-400" />
            </SettingsRow>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Settings;
