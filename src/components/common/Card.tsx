import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'accent' | 'success' | 'warning';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border-2 border-slate-200/80 shadow-sm',
    elevated: 'bg-white border-2 border-slate-200/80 shadow-md',
    bordered: 'bg-white border-3 border-slate-300 shadow-sm',
    accent: 'bg-gradient-to-br from-sky-50 to-white border-2 border-sky-300 shadow-md',
    success: 'bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-300 shadow-md',
    warning: 'bg-gradient-to-br from-amber-50 to-white border-2 border-amber-300 shadow-md'
  };

  const hoverStyle = hoverEffect 
    ? 'transition-all duration-200 hover:shadow-lg hover:border-sky-400 hover:-translate-y-0.5' 
    : '';

  return (
    <div
      className={`rounded-3xl p-5 sm:p-7 ${variantStyles[variant]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
