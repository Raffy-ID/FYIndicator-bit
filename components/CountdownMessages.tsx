
import React, { useState } from 'react';
import { CountdownMessages } from '../types';
import SaveIcon from './icons/SaveIcon';
import SubPageHeader from './SubPageHeader';

interface CountdownMessagesProps {
  initialMessages: CountdownMessages;
  onSave: (messages: CountdownMessages) => void;
  onBack: () => void;
}

const CountdownMessagesScreen: React.FC<CountdownMessagesProps> = ({ initialMessages, onSave, onBack }) => {
  const [messages, setMessages] = useState<CountdownMessages>(initialMessages);

  const handleSave = () => {
    onSave(messages);
  };

  const handleInputChange = (field: keyof CountdownMessages, value: string) => {
    setMessages(prev => ({ ...prev, [field]: value }));
  };

  const FormInput = ({ label, value, field }: { label: string; value: string; field: keyof CountdownMessages }) => (
    <div className="pt-4 pb-2 border-b border-gray-200 dark:border-slate-700">
      <label htmlFor={`message-input-${field}`} className="text-xs text-sky-600">{label}</label>
      <input
        id={`message-input-${field}`}
        type="text"
        value={value}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="w-full bg-transparent text-slate-900 dark:text-slate-100 text-lg py-1 focus:outline-none"
      />
    </div>
  );

  const headerActions = (
    <button onClick={handleSave} aria-label="Save messages" className="p-1">
        <SaveIcon className="w-6 h-6" />
    </button>
  );

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <SubPageHeader title="Countdown messages" onBack={onBack} actions={headerActions} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4">
            <FormInput label="Pre-start text" value={messages.preStart} field="preStart" />
            <FormInput label="Starting text" value={messages.starting} field="starting" />
            <FormInput label="Countdown text" value={messages.countdown} field="countdown" />
            <FormInput label="Completion text" value={messages.completion} field="completion" />
            <FormInput label="Post-end text" value={messages.postEnd} field="postEnd" />
        </div>
      </main>
    </div>
  );
};

export default CountdownMessagesScreen;