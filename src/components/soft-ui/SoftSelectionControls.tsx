import React from 'react';
import { Check } from 'lucide-react';

export interface SoftCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const SoftCheckbox: React.FC<SoftCheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  return (
    <label
      className={`
        inline-flex items-center gap-3 cursor-pointer select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={(e) => {
        e.preventDefault();
        handleToggle();
      }}
    >
      <div
        className={`
          w-6 h-6 rounded-lg soft-surface soft-transition flex items-center justify-center
          ${isChecked ? 'soft-pressed-xs bg-[var(--soft-surface)]' : 'soft-raised-xs hover:soft-raised-sm'}
        `}
      >
        {isChecked && <Check className="w-4 h-4 text-[var(--soft-primary)] stroke-[3]" />}
      </div>
      {label && <span className="text-sm font-semibold text-[var(--soft-text)]">{label}</span>}
    </label>
  );
};

export interface SoftRadioProps {
  checked?: boolean;
  onChange?: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  value?: string;
}

export const SoftRadio: React.FC<SoftRadioProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  return (
    <label
      className={`
        inline-flex items-center gap-3 cursor-pointer select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled && onChange) onChange();
      }}
    >
      <div
        className={`
          w-6 h-6 rounded-full soft-surface soft-transition flex items-center justify-center
          ${checked ? 'soft-pressed-xs' : 'soft-raised-xs hover:soft-raised-sm'}
        `}
      >
        {checked && (
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--soft-primary)] shadow-[0_0_6px_var(--soft-primary-glow)]" />
        )}
      </div>
      {label && <span className="text-sm font-semibold text-[var(--soft-text)]">{label}</span>}
    </label>
  );
};
