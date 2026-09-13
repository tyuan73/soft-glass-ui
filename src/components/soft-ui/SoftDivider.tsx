import React from 'react';

export interface SoftDividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'bevel' | 'inset' | 'raised' | 'dashed' | 'plain';
  label?: string;
  icon?: React.ReactNode;
  labelPosition?: 'left' | 'center' | 'right';
  className?: string;
}

export const SoftDivider: React.FC<SoftDividerProps> = ({
  orientation = 'horizontal',
  variant = 'bevel',
  label,
  icon,
  labelPosition = 'center',
  className = '',
}) => {
  const isVertical = orientation === 'vertical';

  const getVariantStyles = () => {
    switch (variant) {
      case 'inset':
        return isVertical
          ? 'w-1 soft-pressed-xs rounded-full bg-[var(--soft-surface)]'
          : 'h-1 w-full soft-pressed-xs rounded-full bg-[var(--soft-surface)]';
      case 'raised':
        return isVertical
          ? 'w-1 soft-raised-xs rounded-full bg-[var(--soft-surface)]'
          : 'h-1 w-full soft-raised-xs rounded-full bg-[var(--soft-surface)]';
      case 'dashed':
        return isVertical
          ? 'w-0 border-l-2 border-dashed border-[var(--soft-text-subtle)]/30'
          : 'h-0 w-full border-t-2 border-dashed border-[var(--soft-text-subtle)]/30';
      case 'plain':
        return isVertical
          ? 'w-[1px] bg-black/10 dark:bg-white/10'
          : 'h-[1px] w-full bg-black/10 dark:bg-white/10';
      default: // bevel (dual shadow groove: shadow on top/left, highlight on bottom/right)
        return isVertical
          ? 'w-0.5 border-l border-[var(--shadow-dark)] border-r border-[var(--shadow-light)]'
          : 'h-0.5 border-t border-[var(--shadow-dark)] border-b border-[var(--shadow-light)] opacity-60';
    }
  };

  // Vertical Divider
  if (isVertical) {
    return (
      <div
        className={`inline-block self-stretch mx-3 my-1 shrink-0 ${getVariantStyles()} ${className}`}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  // Horizontal with Label/Icon
  if (label || icon) {
    const getJustify = () => {
      switch (labelPosition) {
        case 'left':
          return 'justify-start';
        case 'right':
          return 'justify-end';
        default:
          return 'justify-center';
      }
    };

    return (
      <div
        className={`flex items-center gap-3 my-6 w-full ${getJustify()} ${className}`}
        role="separator"
      >
        <div className={`flex-1 ${getVariantStyles()}`} />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl soft-surface soft-pressed-xs text-xs font-bold uppercase tracking-wider text-[var(--soft-text-muted)] select-none">
          {icon && <span className="shrink-0 text-[var(--soft-primary)]">{icon}</span>}
          {label && <span>{label}</span>}
        </div>
        <div className={`flex-1 ${getVariantStyles()}`} />
      </div>
    );
  }

  // Standard Horizontal Divider
  return (
    <div
      className={`my-6 w-full ${getVariantStyles()} ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};
