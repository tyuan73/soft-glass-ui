import React, { useState, useCallback, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastContext, type ToastItem, type ToastVariant, type ToastContextType } from './useToast';

export type { ToastItem, ToastVariant, ToastContextType };

export const SoftToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const success = useCallback(
    (message: string, title?: string) => {
      return showToast({ message, title: title || 'Success', variant: 'success' });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, title?: string) => {
      return showToast({ message, title: title || 'Error', variant: 'error' });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, title?: string) => {
      return showToast({ message, title: title || 'Information', variant: 'info' });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, title?: string) => {
      return showToast({ message, title: title || 'Warning', variant: 'warning' });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast, success, error, info, warning }}>
      {children}
      {/* Toast Floating Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <SoftToastItem key={t.id} item={t} onDismiss={() => dismissToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const SoftToastItem: React.FC<{ item: ToastItem; onDismiss: () => void }> = ({
  item,
  onDismiss,
}) => {
  const duration = item.duration ?? 4000;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onDismiss();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onDismiss]);

  const getVariantStyles = () => {
    switch (item.variant) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          barColor: 'bg-emerald-500',
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
          barColor: 'bg-rose-500',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          barColor: 'bg-amber-500',
        };
      case 'info':
        return {
          icon: <Info className="w-5 h-5 text-[var(--soft-primary)]" />,
          barColor: 'bg-[var(--soft-primary)]',
        };
      default:
        return {
          icon: <Info className="w-5 h-5 text-[var(--soft-text-muted)]" />,
          barColor: 'bg-[var(--soft-primary)]',
        };
    }
  };

  const { icon, barColor } = getVariantStyles();

  return (
    <div
      className="pointer-events-auto relative overflow-hidden soft-surface soft-raised-lg rounded-2xl p-4 transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in select-none border border-white/20"
      role="alert"
    >
      <div className="flex items-start gap-3.5">
        {/* Sunken Icon Well */}
        <div className="w-9 h-9 rounded-xl soft-surface soft-pressed-xs flex items-center justify-center shrink-0">
          {icon}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 pr-2">
          {item.title && (
            <h5 className="text-sm font-bold text-[var(--soft-text)] leading-tight truncate">
              {item.title}
            </h5>
          )}
          <p className="text-xs text-[var(--soft-text-muted)] mt-0.5 leading-relaxed">
            {item.message}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onDismiss}
          className="p-1.5 rounded-lg soft-surface soft-raised-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] hover:soft-raised-sm active:soft-pressed-xs cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Duration Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
