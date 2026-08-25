import React from 'react';
import { soundManager } from '../../utils/sound';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'warning' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  playClickSound?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  playClickSound = true,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    if (playClickSound) {
      soundManager.playClick();
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 select-none active:scale-[0.98] cursor-pointer touch-target-senior text-center';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white shadow-md hover:shadow-lg shadow-sky-600/20 focus-visible:ring-sky-400 border-2 border-sky-600',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-300 focus-visible:ring-slate-400',
    outline: 'bg-transparent hover:bg-sky-50 text-sky-700 border-2 border-sky-600 focus-visible:ring-sky-400',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg shadow-emerald-600/25 focus-visible:ring-emerald-400 border-2 border-emerald-600',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg shadow-rose-600/20 focus-visible:ring-rose-400 border-2 border-rose-600',
    warning: 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md hover:shadow-lg shadow-amber-500/25 focus-visible:ring-amber-400 border-2 border-amber-500',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 border-2 border-transparent focus-visible:ring-slate-300'
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2.5 text-sm gap-2 min-h-[44px]',
    md: 'px-5 py-3 text-base gap-2.5 min-h-[48px]',
    lg: 'px-6 py-4 text-lg gap-3 min-h-[54px]',
    xl: 'px-8 py-5 text-xl gap-3.5 min-h-[62px]'
  };

  const disabledStyles = disabled || isLoading 
    ? 'opacity-60 cursor-not-allowed transform-none hover:shadow-none hover:scale-100 filter grayscale-[40%]' 
    : '';

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Cargando...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0 flex items-center justify-center">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0 flex items-center justify-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
