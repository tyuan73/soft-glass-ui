import React from 'react';

export type SoftButtonColor =
  'default' | 'primary' | 'success' | 'danger' | 'warning' | 'purple' | 'teal' | 'dark';

export interface SoftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'raised' | 'pressed' | 'accent' | 'flat';
  color?: SoftButtonColor;
  size?: 'sm' | 'md' | 'lg' | 'icon';
  active?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  rounded?: 'md' | 'lg' | 'xl' | 'pill';
}

export const SoftButton: React.FC<SoftButtonProps> = ({
  children,
  variant = 'raised',
  color = 'default',
  size = 'md',
  active = false,
  icon,
  iconPosition = 'left',
  rounded = 'xl',
  className = '',
  disabled = false,
  ...props
}) => {
  const isPressed = variant === 'pressed' || active;

  const getSizeClasses = () => {
    if (size === 'icon') {
      return 'w-11 h-11 p-0 flex items-center justify-center';
    }
    switch (size) {
      case 'sm':
        return 'px-3.5 py-1.5 text-xs font-semibold gap-1.5';
      case 'lg':
        return 'px-7 py-3 text-base font-semibold gap-2.5';
      default:
        return 'px-5 py-2.5 text-sm font-semibold gap-2';
    }
  };

  const getRadiusClass = () => {
    if (size === 'icon') return 'rounded-full';
    switch (rounded) {
      case 'md':
        return 'rounded-xl';
      case 'lg':
        return 'rounded-2xl';
      case 'pill':
        return 'rounded-full';
      default:
        return 'rounded-2xl';
    }
  };

  const getColorClasses = () => {
    if (color === 'default') {
      return variant === 'accent'
        ? 'bg-[var(--soft-primary)] text-[var(--soft-btn-accent-text)] shadow-[0_4px_14px_var(--soft-primary-glow)]'
        : 'soft-surface text-[var(--soft-text)]';
    }

    if (variant === 'accent') {
      switch (color) {
        case 'primary':
          return 'bg-blue-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.45)]';
        case 'success':
          return 'bg-emerald-600 text-white shadow-[0_4px_14px_rgba(16,185,129,0.45)]';
        case 'danger':
          return 'bg-rose-600 text-white shadow-[0_4px_14px_rgba(225,29,72,0.45)]';
        case 'warning':
          return 'bg-amber-500 text-slate-900 shadow-[0_4px_14px_rgba(245,158,11,0.45)]';
        case 'purple':
          return 'bg-purple-600 text-white shadow-[0_4px_14px_rgba(147,51,234,0.45)]';
        case 'teal':
          return 'bg-teal-600 text-white shadow-[0_4px_14px_rgba(13,148,136,0.45)]';
        case 'dark':
          return 'bg-slate-900 text-white shadow-[0_4px_14px_rgba(15,23,42,0.5)]';
        default:
          return 'bg-[var(--soft-primary)] text-[var(--soft-btn-accent-text)]';
      }
    }

    // Soft Tinted Surfaces
    switch (color) {
      case 'primary':
        return 'bg-blue-500/12 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-500/25';
      case 'success':
        return 'bg-emerald-500/12 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/25';
      case 'danger':
        return 'bg-rose-500/12 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-500/25';
      case 'warning':
        return 'bg-amber-500/15 text-amber-700 dark:bg-amber-500/25 dark:text-amber-300 border border-amber-500/25';
      case 'purple':
        return 'bg-purple-500/12 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-500/25';
      case 'teal':
        return 'bg-teal-500/12 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300 border border-teal-500/25';
      case 'dark':
        return 'bg-slate-800 text-slate-100 dark:bg-slate-900 dark:text-slate-200 border border-slate-700/50';
      default:
        return 'soft-surface text-[var(--soft-text)]';
    }
  };

  const getVariantClasses = () => {
    if (disabled) {
      return 'opacity-50 cursor-not-allowed soft-pressed-xs text-[var(--soft-text-subtle)]';
    }

    if (variant === 'accent') {
      return 'soft-raised-sm hover:brightness-105 active:soft-pressed-sm';
    }

    if (isPressed) {
      return 'soft-pressed-sm';
    }

    if (variant === 'flat') {
      return 'hover:soft-raised-xs active:soft-pressed-xs';
    }

    // Default 'raised'
    return 'soft-raised-sm hover:soft-raised-md hover:scale-[1.01] active:soft-pressed-sm active:scale-[0.99]';
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        inline-flex items-center justify-center select-none outline-none
        soft-transition font-medium cursor-pointer
        ${getSizeClasses()}
        ${getRadiusClass()}
        ${getColorClasses()}
        ${getVariantClasses()}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};
