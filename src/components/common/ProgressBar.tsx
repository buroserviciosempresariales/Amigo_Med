import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorOverride?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercentage = true,
  size = 'md',
  colorOverride,
  className = ''
}) => {
  const clampedValue = Math.min(100, Math.max(0, Math.round(value)));

  // Determine accessible color based on percentage
  const getColorClass = () => {
    if (colorOverride) return colorOverride;
    if (clampedValue >= 80) return 'bg-emerald-500';
    if (clampedValue >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const heightClasses = {
    sm: 'h-2.5',
    md: 'h-4',
    lg: 'h-6'
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-slate-800 font-bold text-sm sm:text-base">
          {label && <span>{label}</span>}
          {showPercentage && <span className="text-sky-800 font-extrabold">{clampedValue}%</span>}
        </div>
      )}

      <div
        className={`w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300 ${heightClasses[size]}`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `Progreso: ${clampedValue}%`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getColorClass()}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
