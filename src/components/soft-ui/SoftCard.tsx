import React from 'react';

export interface SoftCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'raised' | 'pressed' | 'flat' | 'convex' | 'concave';
  elevation?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  subtitle?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'pill';
  interactive?: boolean;
}

export const SoftCard: React.FC<SoftCardProps> = ({
  children,
  variant = 'raised',
  elevation = 'md',
  title,
  subtitle,
  rounded = '3xl',
  interactive = false,
  className = '',
  ...props
}) => {
  const getElevationShadow = () => {
    if (variant === 'pressed') {
      switch (elevation) {
        case 'xs':
          return 'soft-pressed-xs';
        case 'sm':
          return 'soft-pressed-sm';
        case 'lg':
        case 'xl':
          return 'soft-pressed-lg';
        default:
          return 'soft-pressed-md';
      }
    }

    if (variant === 'convex') return 'soft-convex';
    if (variant === 'concave') return 'soft-concave';
    if (variant === 'flat') return 'border border-white/20';

    switch (elevation) {
      case 'xs':
        return 'soft-raised-xs';
      case 'sm':
        return 'soft-raised-sm';
      case 'lg':
        return 'soft-raised-lg';
      case 'xl':
        return 'soft-raised-xl';
      default:
        return 'soft-raised-md';
    }
  };

  const getRadius = () => {
    switch (rounded) {
      case 'sm':
        return 'rounded-xl';
      case 'md':
        return 'rounded-2xl';
      case 'lg':
        return 'rounded-[22px]';
      case 'xl':
        return 'rounded-[26px]';
      case '2xl':
        return 'rounded-[30px]';
      case '3xl':
        return 'rounded-[34px]';
      case 'pill':
        return 'rounded-full';
      default:
        return 'rounded-[30px]';
    }
  };

  return (
    <div
      className={`
        relative soft-surface soft-transition p-6
        ${getElevationShadow()}
        ${getRadius()}
        ${interactive ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]' : ''}
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className="mb-4">
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--soft-text-muted)] select-none">
            {title}
          </span>
          {subtitle && <p className="text-xs text-[var(--soft-text-subtle)] mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};
