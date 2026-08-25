import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', title?: string, duration = 4500) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastItem = { id, message, type, title, duration };

    setToasts(prev => [...prev.slice(-3), newToast]); // keep max 4 visible

    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Accessible Toast Container */}
      <div 
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-2"
        role="region"
        aria-label="Notificaciones del sistema"
      >
        {toasts.map(toast => {
          const typeConfig = {
            success: {
              bg: 'bg-emerald-600 text-white border-emerald-700',
              icon: <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-white" aria-hidden="true" />,
              defaultTitle: '¡Muy bien!'
            },
            warning: {
              bg: 'bg-amber-600 text-white border-amber-700',
              icon: <AlertTriangle className="w-6 h-6 flex-shrink-0 text-white" aria-hidden="true" />,
              defaultTitle: 'Aviso importante'
            },
            error: {
              bg: 'bg-rose-600 text-white border-rose-700',
              icon: <AlertCircle className="w-6 h-6 flex-shrink-0 text-white" aria-hidden="true" />,
              defaultTitle: 'Atención'
            },
            info: {
              bg: 'bg-sky-700 text-white border-sky-800',
              icon: <Info className="w-6 h-6 flex-shrink-0 text-white" aria-hidden="true" />,
              defaultTitle: 'Información'
            }
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl shadow-xl border-2 transition-all transform animate-in fade-in slide-in-from-bottom-5 duration-300 ${typeConfig.bg}`}
              role="alert"
              aria-live="polite"
            >
              {typeConfig.icon}
              <div className="flex-1">
                <p className="font-bold text-base leading-snug">
                  {toast.title || typeConfig.defaultTitle}
                </p>
                <p className="text-sm sm:text-base opacity-95 mt-0.5 font-normal leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => hideToast(toast.id)}
                className="p-1.5 rounded-lg hover:bg-black/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white touch-target-senior flex items-center justify-center -mr-1 -mt-1"
                aria-label="Cerrar notificación"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
