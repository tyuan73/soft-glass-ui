import React, { useRef, useState, useCallback } from 'react';

export interface SoftSliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (val: number) => void;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
  fillColor?: string;
}

export const SoftSlider: React.FC<SoftSliderProps> = ({
  value: controlledValue,
  defaultValue = 65,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  showValue = true,
  disabled = false,
  className = '',
  fillColor = 'var(--soft-primary)',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = Math.min(100, Math.max(0, ((currentValue - min) / (max - min)) * 100));

  const updateValueFromEvent = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const fraction = Math.min(Math.max(clickX / rect.width, 0), 1);
      const rawValue = min + fraction * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.min(max, Math.max(min, steppedValue));

      if (!isControlled) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
    },
    [disabled, min, max, step, isControlled, onChange]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateValueFromEvent(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled) return;
    updateValueFromEvent(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className={`flex items-center gap-4 w-full select-none ${className}`}>
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`
          relative flex-1 h-3 rounded-full soft-pressed-sm soft-surface
          cursor-pointer overflow-hidden touch-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        role="slider"
        aria-valuenow={currentValue}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {/* Active Fill Bar */}
        <div
          className="h-full rounded-full transition-all duration-75 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
          style={{
            width: `${percentage}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>

      {showValue && (
        <span className="min-w-[48px] text-right font-bold text-lg text-[var(--soft-primary)]">
          {Math.round(currentValue)}%
        </span>
      )}
    </div>
  );
};
