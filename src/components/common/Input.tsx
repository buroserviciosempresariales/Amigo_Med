import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  requiredMarker?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  requiredMarker = false,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 6)}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label 
          htmlFor={inputId}
          className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5"
        >
          <span>{label}</span>
          {requiredMarker && (
            <span className="text-rose-600 font-bold text-lg" title="Campo obligatorio">*</span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-4 pointer-events-none text-slate-500 flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : (helperText ? helperId : undefined)}
          className={`
            w-full bg-white text-slate-900 text-base sm:text-lg font-medium rounded-2xl border-2 transition-colors
            py-3.5 px-4 min-h-[52px]
            ${leftIcon ? 'pl-12' : 'pl-4'}
            ${rightIcon ? 'pr-12' : 'pr-4'}
            ${error 
              ? 'border-rose-500 focus:border-rose-600 focus:ring-4 focus:ring-rose-200 bg-rose-50/20' 
              : 'border-slate-300 hover:border-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100'}
            placeholder:text-slate-400 focus:outline-none
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-4 text-slate-500 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <div id={errorId} className="flex items-center gap-1.5 text-rose-600 text-sm sm:text-base font-semibold mt-0.5" role="alert">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p id={helperId} className="text-slate-600 text-sm sm:text-base">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
