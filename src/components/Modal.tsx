import React, { RefObject } from 'react';
import { cn } from '../utils/cn';

interface ModalProps {
  modalRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-[400px]',
  md: 'w-[500px]',
  lg: 'w-[600px]',
  xl: 'w-[700px]'
};

export function Modal({ 
  modalRef, 
  onClose, 
  title, 
  children, 
  className,
  size = 'md' 
}: ModalProps) {
  return (
    <dialog 
      ref={modalRef}
      className={cn(`
        absolute
        top-[calc(50dvh-50%)]
        left-[calc(50dvw-50%)]
        bg-white
        rounded-md
        h-fit 
        m-auto 
        opacity-0 scale-0 transition-all duration-300 ease-in-out
        open:opacity-100 open:scale-100 
        block open:flex open:flex-col
        z-modal
      `, sizeClasses[size], className)}
    >
      <div className="grid-area-stack h-16 items-center bg-brand/80 text-white">
        <h3 className="mx-auto text-xl uppercase">{title}</h3>
        <button 
          onClick={onClose} 
          className="ml-auto mr-8 hover:brightness-125 transition-all duration-200"
          aria-label="Close modal"
        >
          X
        </button>
      </div>
      <div className="m-8 text-slate-800/80">
        {children}
      </div>
    </dialog>
  );
}
