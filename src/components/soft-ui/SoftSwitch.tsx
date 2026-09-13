import React from 'react';

export interface SoftSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  showStatusLabel?: boolean;
  labelPosition?: 'left' | 'right';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SoftSwitch: React.FC<SoftSwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  showStatusLabel = true,
  labelPosition = 'right',
  className = '',
  size = 'md',
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const nextState = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextState);
    }
    onChange?.(nextState);
  };

  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return {
          track: 'w-12 h-6 p-1',
          thumb: 'w-4 h-4',
          translate: 'translate-x-6',
          text: 'text-xs',
        };
      case 'lg':
        return {
          track: 'w-20 h-10 p-1.5',
          thumb: 'w-7 h-7',
          translate: 'translate-x-10',
          text: 'text-base',
        };
      default:
        return {
          track: 'w-16 h-8 p-1',
          thumb: 'w-6 h-6',
          translate: 'translate-x-8',
          text: 'text-sm',
        };
    }
  };

  const dims = getDimensions();

  const statusLabel = (
    <span
      className={`font-semibold tracking-wider select-none ${dims.text} ${
        isChecked ? 'text-[var(--soft-primary)]' : 'text-[var(--soft-text-muted)]'
      }`}
    >
      {isChecked ? 'ON' : 'OFF'}
    </span>
  );

  return (
    <div
      className={`inline-flex items-center gap-3.5 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={handleToggle}
      role="switch"
      aria-checked={isChecked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      {showStatusLabel && labelPosition === 'left' && statusLabel}

      <div
        className={`
          relative rounded-full soft-pressed-sm soft-surface
          transition-all duration-300 flex items-center
          ${dims.track}
        `}
      >
        <div
          className={`
            rounded-full soft-surface soft-raised-sm
            transform transition-transform duration-300 ease-out
            ${dims.thumb}
            ${isChecked ? `${dims.translate} bg-[var(--soft-surface)]` : 'translate-x-0'}
          `}
        />
      </div>

      {showStatusLabel && labelPosition === 'right' && statusLabel}
    </div>
  );
};
