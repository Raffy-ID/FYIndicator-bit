
import React, { useState, useRef, useEffect } from 'react';
import { NewItemData, DisplayOptions, DisplayUnits, timeUnits, TimeUnit, CountdownMessages } from '../types';

// Icons
import SaveIcon from './icons/SaveIcon';
import DotsVerticalIcon from './icons/DotsVerticalIcon';
import CalendarIcon from './icons/CalendarIcon';
import ClockIcon from './icons/ClockIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

// Components
import ToggleSwitch from './ToggleSwitch';
import Modal from './Modal';
import Checkbox from './Checkbox';
import CountdownMessagesScreen from './CountdownMessages';
import SubPageHeader from './SubPageHeader';

interface AddNewTimerProps {
  onSave: (item: NewItemData) => void;
  onCancel: () => void;
}

// A helper to format date and time for the input fields, respecting local timezone
const getLocalISOStringParts = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const shiftedDate = new Date(date.getTime() - (offset * 60 * 1000));
    const [datePart, timePart] = shiftedDate.toISOString().split('T');
    return { datePart, timePart: timePart.substring(0, 5) };
}

const allTimeZones = [
    'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 
    'Europe/London', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Jakarta', 'Australia/Sydney'
];

const AddNewTimer: React.FC<AddNewTimerProps> = ({ onSave, onCancel }) => {
  const [currentScreen, setCurrentScreen] = useState('main'); // 'main' or 'countdown'

  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [title, setTitle] = useState('New timer');
  const [separateTimes, setSeparateTimes] = useState(true);
  
  const { datePart: startDatePart, timePart: startTimePart } = getLocalISOStringParts(now);
  const { datePart: endDatePart, timePart: endTimePart } = getLocalISOStringParts(oneHourFromNow);

  const [startDate, setStartDate] = useState(startDatePart);
  const [startTime, setStartTime] = useState(startTimePart);
  const [endDate, setEndDate] = useState(endDatePart);
  const [endTime, setEndTime] = useState(endTimePart);
  const [timeZone, setTimeZone] = useState(allTimeZones.includes(userTimeZone) ? userTimeZone : 'UTC');

  const [stopWhenCompleted, setStopWhenCompleted] = useState(true);
  const [repeat, setRepeat] = useState(false);
  const [notifyOnStart, setNotifyOnStart] = useState(true);
  const [notifyOnCompletion, setNotifyOnCompletion] = useState(true);
  const [decimalPlaces, setDecimalPlaces] = useState(1);
  
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isUnitsModalOpen, setUnitsModalOpen] = useState(false);
  const [isDecimalModalOpen, setDecimalModalOpen] = useState(false);
  
  const [tempDecimalPlaces, setTempDecimalPlaces] = useState(decimalPlaces);
  const selectedDecimalRef = useRef<HTMLButtonElement>(null);

  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    progressBar: true,
    startTime: true,
    endTime: true,
  });
  const [tempDisplayOptions, setTempDisplayOptions] = useState<DisplayOptions>(displayOptions);

  const [displayUnits, setDisplayUnits] = useState<DisplayUnits>({
    Years: true, Months: true, Weeks: true, Days: true, Hours: true, Minutes: true, Seconds: true,
  });
  const [tempDisplayUnits, setTempDisplayUnits] = useState<DisplayUnits>(displayUnits);
  
  const [countdownMessages, setCountdownMessages] = useState<CountdownMessages>({
    preStart: 'Time until start:',
    starting: 'Started',
    countdown: 'Time remaining:',
    completion: 'Completed',
    postEnd: 'Time since completion:',
  });

  useEffect(() => {
    if (isInfoModalOpen) {
        setTempDisplayOptions(displayOptions);
    }
  }, [isInfoModalOpen, displayOptions]);

  useEffect(() => {
    if (isUnitsModalOpen) {
        setTempDisplayUnits(displayUnits);
    }
  }, [isUnitsModalOpen, displayUnits]);

  useEffect(() => {
    if (isDecimalModalOpen) {
        setTempDecimalPlaces(decimalPlaces);
        setTimeout(() => {
            selectedDecimalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
    }
  }, [isDecimalModalOpen, decimalPlaces]);

  const handleSave = () => {
    // Note: When parsing, we create the date object from parts, which JS interprets in the local timezone.
    // .toISOString() then converts it to a standardized UTC string for storage.
    // The selected `timeZone` is for DISPLAY purposes, not parsing here.
    const startDateTime = new Date(`${startDate}T${startTime}:00`).toISOString();
    const endDateTime = new Date(`${endDate}T${endTime}:00`).toISOString();
    
    const newItem: NewItemData = {
        type: 'time-based',
        title,
        startTime: startDateTime,
        endTime: endDateTime,
        timeZone,
        displayOptions,
        displayUnits,
        countdownMessages,
        stopWhenCompleted,
        decimalPlaces,
    };
    onSave(newItem);
  };

  const handleSaveMessages = (newMessages: CountdownMessages) => {
    setCountdownMessages(newMessages);
    setCurrentScreen('main');
  };
  
  const FormRow = ({ label, children, isToggle = false, onClick, isClickable = false }: { label: string, children: React.ReactNode, isToggle?: boolean, onClick?: () => void, isClickable?: boolean }) => (
    <div onClick={onClick} className={`flex items-center justify-between min-h-[56px] px-2 -mx-2 ${isClickable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 rounded' : ''} ${!isToggle ? 'border-b border-gray-200 dark:border-slate-700' : ''}`}>
        <span className="text-slate-800 dark:text-slate-200">{label}</span>
        {children}
    </div>
  );
  
  const FormInput = ({ label, value, onChange, type, icon }: {label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string, icon: React.ReactNode}) => (
     <div className="py-3 border-b border-gray-200 dark:border-slate-700">
        <label className="text-xs text-sky-600">{label}</label>
        <div className="flex items-center">
            <input 
                type={type} 
                value={value}
                onChange={onChange}
                className="w-full bg-transparent text-slate-900 dark:text-slate-100 text-lg focus:outline-none"
                style={{ colorScheme: 'light' }} 
            />
            {icon}
        </div>
     </div>
  );
  
  const TimezoneSelect = ({ label, value, onChange }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
    <div className="py-3 border-b border-gray-200 dark:border-slate-700">
        <label className="text-xs text-sky-600">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 text-lg focus:outline-none py-1 -ml-1">
            {allTimeZones.map(tz => <option key={tz} value={tz} className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">{tz}</option>)}
        </select>
    </div>
  );

  if (currentScreen === 'countdown') {
    return <CountdownMessagesScreen initialMessages={countdownMessages} onSave={handleSaveMessages} onBack={() => setCurrentScreen('main')} />
  }
  
  const headerActions = (
    <div className="flex items-center space-x-4">
        <button onClick={handleSave} aria-label="Save timer" className="p-1">
            <SaveIcon className="w-6 h-6" />
        </button>
        <button aria-label="More options" className="p-1">
            <DotsVerticalIcon className="w-6 h-6" />
        </button>
    </div>
  );

  return (
    <>
    <Modal isOpen={isInfoModalOpen} onClose={() => setInfoModalOpen(false)} title="Information to display">
        <div className="p-4 text-slate-800 dark:text-slate-200">
            <Checkbox 
                label="Progress bar"
                checked={tempDisplayOptions.progressBar}
                onChange={checked => setTempDisplayOptions(prev => ({...prev, progressBar: checked}))}
            />
            <Checkbox 
                label="Start time"
                checked={tempDisplayOptions.startTime}
                onChange={checked => setTempDisplayOptions(prev => ({...prev, startTime: checked}))}
            />
            <Checkbox 
                label="End time"
                checked={tempDisplayOptions.endTime}
                onChange={checked => setTempDisplayOptions(prev => ({...prev, endTime: checked}))}
            />
        </div>
        <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-200 dark:bg-slate-700 dark:border-slate-600">
            <button onClick={() => setInfoModalOpen(false)} className="font-bold text-sky-600 hover:text-sky-500">BATAL</button>
            <button onClick={() => { setDisplayOptions(tempDisplayOptions); setInfoModalOpen(false); }} className="font-bold text-sky-600 hover:text-sky-500">OKE</button>
        </div>
    </Modal>

    <Modal isOpen={isUnitsModalOpen} onClose={() => setUnitsModalOpen(false)} title="Units of time to display">
        <div className="p-4 text-slate-800 dark:text-slate-200">
            {timeUnits.map((unit: TimeUnit) => (
                <Checkbox 
                    key={unit}
                    label={unit}
                    checked={!!tempDisplayUnits[unit]}
                    onChange={checked => setTempDisplayUnits(prev => ({ ...prev, [unit]: checked }))}
                />
            ))}
        </div>
        <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-200 dark:bg-slate-700 dark:border-slate-600">
            <button onClick={() => setUnitsModalOpen(false)} className="font-bold text-sky-600 hover:text-sky-500">BATAL</button>
            <button onClick={() => { setDisplayUnits(tempDisplayUnits); setUnitsModalOpen(false); }} className="font-bold text-sky-600 hover:text-sky-500">OKE</button>
        </div>
    </Modal>
    
    <Modal isOpen={isDecimalModalOpen} onClose={() => setDecimalModalOpen(false)} title="Number of decimal places shown">
        <div className="h-48 overflow-y-auto py-4 snap-y snap-mandatory bg-gray-100 dark:bg-slate-800">
            {Array.from({ length: 11 }, (_, i) => i).map(num => (
                <div key={num} className="w-full text-center py-2 flex flex-col items-center snap-center">
                    {tempDecimalPlaces === num && <div className="w-16 mx-auto border-t border-gray-300 dark:border-slate-600 mb-3"></div>}
                    <button
                        ref={tempDecimalPlaces === num ? selectedDecimalRef : null}
                        onClick={() => setTempDecimalPlaces(num)}
                        className={`text-3xl font-mono transition-all duration-200 ease-in-out ${tempDecimalPlaces === num ? 'text-slate-900 dark:text-slate-100 scale-110' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        {num}
                    </button>
                    {tempDecimalPlaces === num && <div className="w-16 mx-auto border-b border-gray-300 dark:border-slate-600 mt-3"></div>}
                </div>
            ))}
        </div>
        <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-200 dark:bg-slate-700 dark:border-slate-600">
            <button onClick={() => setDecimalModalOpen(false)} className="font-bold text-sky-600 hover:text-sky-500">BATAL</button>
            <button onClick={() => { setDecimalPlaces(tempDecimalPlaces); setDecimalModalOpen(false); }} className="font-bold text-sky-600 hover:text-sky-500">OKE</button>
        </div>
    </Modal>


    <div className="flex flex-col h-screen font-sans bg-gray-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
        <SubPageHeader title="Add new timer" onBack={onCancel} actions={headerActions} />

        <main className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4">
                <div className="pt-4 pb-2 border-b border-gray-200 dark:border-slate-700">
                    <label htmlFor="timer-title" className="text-xs text-sky-600">Timer title</label>
                    <input 
                        id="timer-title"
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent text-slate-900 dark:text-slate-100 text-lg py-1 focus:outline-none"
                    />
                </div>
                
                <FormRow label="Separate start and end times" isToggle>
                    <ToggleSwitch checked={separateTimes} onChange={setSeparateTimes} ariaLabel="Separate start and end times" />
                </FormRow>

                {separateTimes && (
                    <>
                        <FormInput label="Start date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} icon={<CalendarIcon className="w-6 h-6 text-slate-400" />} />
                        <FormInput label="Start time" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} icon={<ClockIcon className="w-6 h-6 text-slate-400" />} />
                        <TimezoneSelect label="Start time zone" value={timeZone} onChange={e => setTimeZone(e.target.value)} />

                        <FormInput label="End date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} icon={<CalendarIcon className="w-6 h-6 text-slate-400" />} />
                        <FormInput label="End time" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} icon={<ClockIcon className="w-6 h-6 text-slate-400" />} />
                        <TimezoneSelect label="End time zone" value={timeZone} onChange={e => setTimeZone(e.target.value)} />
                    </>
                )}

                <div className="mt-4 border-t border-gray-200 dark:border-slate-700">
                    <FormRow label="Stop timer when completed" isToggle>
                        <ToggleSwitch checked={stopWhenCompleted} onChange={setStopWhenCompleted} ariaLabel="Stop timer when completed" />
                    </FormRow>
                     <FormRow label="Repeat" isToggle>
                        <ToggleSwitch checked={repeat} onChange={setRepeat} ariaLabel="Repeat" />
                    </FormRow>
                </div>

                <div className="mt-4 border-t border-gray-200 dark:border-slate-700">
                     <FormRow label="Information to display" isClickable onClick={() => setInfoModalOpen(true)}>
                        <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                     </FormRow>
                    <FormRow label="Units of time to display" isClickable onClick={() => setUnitsModalOpen(true)}>
                        <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    </FormRow>
                    <FormRow label="Countdown messages" isClickable onClick={() => setCurrentScreen('countdown')}>
                        <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    </FormRow>
                     <FormRow label="Number of decimal places shown" isClickable onClick={() => setDecimalModalOpen(true)} >
                        <div className="flex items-center space-x-2">
                            <span className="text-slate-900 dark:text-slate-200">{decimalPlaces}</span>
                            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                        </div>
                    </FormRow>
                </div>
                
                <div className="mt-4 border-t border-gray-200 dark:border-slate-700">
                     <FormRow label="Send notification on start" isToggle>
                        <ToggleSwitch checked={notifyOnStart} onChange={setNotifyOnStart} ariaLabel="Send notification on start" />
                    </FormRow>
                     <FormRow label="Send notification on completion" isToggle>
                        <ToggleSwitch checked={notifyOnCompletion} onChange={setNotifyOnCompletion} ariaLabel="Send notification on completion" />
                    </FormRow>
                </div>

                <div className="mt-4 mb-8 border-t border-gray-200 dark:border-slate-700">
                     <FormRow label="Notification settings" isClickable >
                        <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                     </FormRow>
                    <div className="px-2 py-4 text-sky-600 cursor-pointer hover:text-sky-500">
                        Reset notification settings
                    </div>
                </div>
            </div>
        </main>
    </div>
    </>
  );
};

export default AddNewTimer;