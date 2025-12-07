'use client';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = type === 'success'
    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
    : 'bg-gradient-to-r from-red-500 to-rose-500';

  return (
    <div
      className={`fixed top-24 right-4 md:right-6 ${styles} text-white px-6 py-4 rounded-xl shadow-2xl z-[9999] animate-slideIn flex items-center gap-3 min-w-[280px] max-w-[90vw] pointer-events-auto`}
      role="alert"
      aria-live="assertive"
      suppressHydrationWarning
    >
      <span className="text-xl flex-shrink-0">{type === 'success' ? '✓' : '✗'}</span>
      <span className="flex-1 font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/80 hover:text-white transition-opacity"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

