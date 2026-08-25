import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  onClose,
  className = ''
}) => {
  const configs = {
    info: {
      bg: 'bg-sky-50 border-sky-300 text-sky-950',
      icon: <Info className="w-6 h-6 text-sky-700 flex-shrink-0" />
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
    },
    warning: {
      bg: 'bg-amber-50 border-amber-300 text-amber-950',
      icon: <AlertTriangle className="w-6 h-6 text-amber-700 flex-shrink-0" />
    },
    error: {
      bg: 'bg-rose-50 border-rose-300 text-rose-950',
      icon: <AlertCircle className="w-6 h-6 text-rose-700 flex-shrink-0" />
    }
  };

  const config = configs[type];

  return (
    <div
      className={`rounded-2xl border-2 p-4 sm:p-5 flex items-start gap-3.5 ${config.bg} ${className}`}
      role="alert"
    >
      {config.icon}
      <div className="flex-1">
        {title && <h4 className="font-bold text-base sm:text-lg mb-1 leading-snug">{title}</h4>}
        <div className="text-sm sm:text-base leading-relaxed opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/10 transition-colors touch-target-senior flex items-center justify-center -mr-1 -mt-1"
          aria-label="Cerrar aviso"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
