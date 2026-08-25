import React, { forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (Option | string)[];
  error?: string;
  helperText?: string;
  requiredMarker?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  helperText,
  requiredMarker = false,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 6)}`;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label 
          htmlFor={selectId}
          className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5"
        >
          <span>{label}</span>
          {requiredMarker && (
            <span className="text-rose-600 font-bold text-lg" title="Campo obligatorio">*</span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : (helperText ? helperId : undefined)}
          className={`
            w-full bg-white text-slate-900 text-base sm:text-lg font-medium rounded-2xl border-2 transition-colors
            py-3.5 pl-4 pr-12 min-h-[52px] appearance-none cursor-pointer
            ${error 
              ? 'border-rose-500 focus:border-rose-600 focus:ring-4 focus:ring-rose-200 bg-rose-50/20' 
              : 'border-slate-300 hover:border-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100'}
            focus:outline-none
            ${className}
          `}
          {...props}
        >
          {options.map((opt, idx) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const lbl = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={idx} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>

        <div className="absolute right-4 pointer-events-none text-slate-600 flex items-center justify-center">
          <ChevronDown className="w-6 h-6" />
        </div>
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

Select.displayName = 'Select';
