import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto flex flex-col dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl text-slate-900 font-semibold dark:text-slate-200">{title}</h2>
        </div>
        <div className="flex-grow overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;