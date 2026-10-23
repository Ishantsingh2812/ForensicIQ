import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  position?: 'right' | 'bottom';
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = 'right',
  children,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      drawerRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses = {
    right: 'inset-y-0 right-0 w-full max-w-md h-full border-l border-forensic-700',
    bottom:
      'inset-x-0 bottom-0 w-full max-h-[85vh] rounded-t-2xl border-t border-forensic-700 pb-safe',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex bg-forensic-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`fixed bg-forensic-900 shadow-2xl flex flex-col focus:outline-none ${positionClasses[position]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-forensic-800 shrink-0">
          <h2 id="drawer-title" className="text-lg font-bold text-slate-100 flex items-center gap-2">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-forensic-800 focus:outline-none focus:ring-2 focus:ring-evidence-cyan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};
