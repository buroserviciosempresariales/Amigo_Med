import React from 'react';
import { Check, Clock, AlertCircle, RefreshCw, XCircle } from 'lucide-react';
import type { DoseStatus } from '../../types';

export type BadgeVariant = DoseStatus | 'info' | 'warning' | 'success' | 'danger' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  label,
  size = 'md',
  children,
  showIcon = true,
  className = ''
}) => {
  const configs: Record<BadgeVariant, { bg: string; text: string; border: string; icon: React.ReactNode; defaultText: string }> = {
    taken: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-900',
      border: 'border-emerald-300',
      icon: <Check className="w-4 h-4 text-emerald-700" />,
      defaultText: 'Tomada'
    },
    pending: {
      bg: 'bg-sky-100',
      text: 'text-sky-900',
      border: 'border-sky-300',
      icon: <Clock className="w-4 h-4 text-sky-700" />,
      defaultText: 'Pendiente'
    },
    snoozed: {
      bg: 'bg-amber-100',
      text: 'text-amber-950',
      border: 'border-amber-300',
      icon: <RefreshCw className="w-4 h-4 text-amber-700 animate-spin-slow" />,
      defaultText: 'Pospuesta'
    },
    omitted: {
      bg: 'bg-rose-100',
      text: 'text-rose-900',
      border: 'border-rose-300',
      icon: <XCircle className="w-4 h-4 text-rose-700" />,
      defaultText: 'Omitida'
    },
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-900',
      border: 'border-blue-300',
      icon: <Clock className="w-4 h-4 text-blue-700" />,
      defaultText: 'Información'
    },
    warning: {
      bg: 'bg-amber-100',
      text: 'text-amber-950',
      border: 'border-amber-400',
      icon: <AlertCircle className="w-4 h-4 text-amber-800" />,
      defaultText: 'Atención'
    },
    success: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-900',
      border: 'border-emerald-300',
      icon: <Check className="w-4 h-4 text-emerald-700" />,
      defaultText: 'Activo'
    },
    danger: {
      bg: 'bg-rose-100',
      text: 'text-rose-900',
      border: 'border-rose-300',
      icon: <AlertCircle className="w-4 h-4 text-rose-700" />,
      defaultText: 'Inactivo'
    },
    neutral: {
      bg: 'bg-slate-100',
      text: 'text-slate-800',
      border: 'border-slate-300',
      icon: null,
      defaultText: ''
    }
  };

  const config = configs[variant] || configs.neutral;
  const content = children || label || config.defaultText;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1 font-semibold',
    md: 'text-sm sm:text-base px-3.5 py-1.5 gap-1.5 font-bold',
    lg: 'text-base sm:text-lg px-4 py-2 gap-2 font-bold'
  };

  return (
    <span
      className={`inline-flex items-center rounded-xl border-2 ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && config.icon}
      <span>{content}</span>
    </span>
  );
};
