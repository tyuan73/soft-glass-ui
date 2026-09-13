import React from 'react';

export interface SoftProgressBarProps {
  value: number; // 0 - 100
  height?: number;
  showLabel?: boolean;
  animated?: boolean;
  color?: string;
  className?: string;
  label?: string;
}

export const SoftProgressBar: React.FC<SoftProgressBarProps> = ({
  value,
  height = 12,
  showLabel = false,
  animated = false,
  color = 'var(--soft-primary)',
  className = '',
  label,
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2 text-xs font-semibold text-[var(--soft-text-muted)]">
          <span>{label}</span>
          {showLabel && <span className="text-[var(--soft-primary)]">{Math.round(clamped)}%</span>}
        </div>
      )}
      <div
        className="relative w-full rounded-full soft-pressed-sm soft-surface overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{
            width: `${clamped}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};
