import React from 'react';

export interface SoftChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'raised' | 'pressed' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const SoftChip: React.FC<SoftChipProps> = ({
  label,
  selected = false,
  onClick,
  icon,
  variant = 'auto',
  size = 'md',
  className = '',
  disabled = false,
}) => {
  const isSelected = variant === 'pressed' || (variant === 'auto' && selected);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1 text-xs gap-1';
      case 'lg':
        return 'px-5 py-2 text-sm gap-2';
      default:
        return 'px-4 py-1.5 text-xs font-semibold gap-1.5';
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center rounded-full select-none outline-none
        soft-surface soft-transition cursor-pointer
        ${getSizeClasses()}
        ${
          isSelected
            ? 'soft-pressed-sm text-[var(--soft-primary)] font-bold'
            : 'soft-raised-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] hover:soft-raised-sm active:soft-pressed-xs'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export interface SoftChipGroupProps {
  chips: string[];
  selectedChips?: string[];
  onChange?: (selected: string[]) => void;
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SoftChipGroup: React.FC<SoftChipGroupProps> = ({
  chips,
  selectedChips: controlledSelected,
  onChange,
  multiple = true,
  size = 'md',
  className = '',
}) => {
  const [internalSelected, setInternalSelected] = React.useState<string[]>(
    controlledSelected ?? (chips.length > 0 ? [chips[0]] : [])
  );
  const isControlled = controlledSelected !== undefined;
  const currentSelected = isControlled ? controlledSelected : internalSelected;

  const handleChipClick = (chip: string) => {
    let next: string[];
    if (multiple) {
      if (currentSelected.includes(chip)) {
        next = currentSelected.filter((c) => c !== chip);
      } else {
        next = [...currentSelected, chip];
      }
    } else {
      next = [chip];
    }

    if (!isControlled) {
      setInternalSelected(next);
    }
    onChange?.(next);
  };

  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {chips.map((chip) => (
        <SoftChip
          key={chip}
          label={chip}
          size={size}
          selected={currentSelected.includes(chip)}
          onClick={() => handleChipClick(chip)}
        />
      ))}
    </div>
  );
};
