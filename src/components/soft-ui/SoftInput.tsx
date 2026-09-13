import React from 'react';

export interface SoftInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  rightElement?: React.ReactNode;
  error?: string;
  helperText?: string;
  rounded?: 'md' | 'lg' | 'xl' | 'pill';
}

export const SoftInput: React.FC<SoftInputProps> = ({
  label,
  icon,
  iconPosition = 'left',
  rightElement,
  error,
  helperText,
  rounded = 'xl',
  className = '',
  disabled = false,
  ...props
}) => {
  const getRadiusClass = () => {
    switch (rounded) {
      case 'md':
        return 'rounded-xl';
      case 'lg':
        return 'rounded-2xl';
      case 'pill':
        return 'rounded-full px-5';
      default:
        return 'rounded-2xl';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--soft-text-muted)] mb-2 select-none">
          {label}
        </label>
      )}

      <div
        className={`
          relative flex items-center soft-surface soft-pressed-sm
          ${getRadiusClass()}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${error ? 'ring-2 ring-[var(--soft-danger)]/50' : 'focus-within:ring-2 focus-within:ring-[var(--soft-primary)]/40'}
        `}
      >
        {icon && iconPosition === 'left' && (
          <span className="pl-4 text-[var(--soft-text-muted)] shrink-0 flex items-center justify-center">
            {icon}
          </span>
        )}

        <input
          disabled={disabled}
          className={`
            w-full bg-transparent px-4 py-3 text-sm font-medium
            text-[var(--soft-text)] placeholder-[var(--soft-text-subtle)]
            outline-none
            ${className}
          `}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <span className="pr-4 text-[var(--soft-text-muted)] shrink-0 flex items-center justify-center">
            {icon}
          </span>
        )}

        {rightElement && (
          <div className="pr-3 text-[var(--soft-text-muted)] shrink-0 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-[var(--soft-danger)] font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-[var(--soft-text-subtle)]">{helperText}</p>
      ) : null}
    </div>
  );
};
