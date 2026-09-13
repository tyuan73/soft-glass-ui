import React from 'react';

export interface SoftIconBoxProps {
  children: React.ReactNode;
  variant?: 'raised' | 'pressed' | 'flat';
  shape?: 'rounded' | 'circle' | 'pill';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  onClick?: () => void;
}

export const SoftIconBox: React.FC<SoftIconBoxProps> = ({
  children,
  variant = 'raised',
  shape = 'rounded',
  size = 'md',
  color,
  className = '',
  onClick,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-7 h-7 p-1 text-xs';
      case 'sm':
        return 'w-9 h-9 p-1.5 text-sm';
      case 'lg':
        return 'w-16 h-16 p-3 text-2xl';
      case 'xl':
        return 'w-20 h-20 p-4 text-3xl';
      default:
        return 'w-12 h-12 p-2.5 text-lg';
    }
  };

  const getShapeClasses = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'pill':
        return 'rounded-full px-3 w-auto';
      default:
        return 'rounded-2xl';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'pressed':
        return 'soft-pressed-sm';
      case 'flat':
        return 'border border-white/20';
      default:
        return 'soft-raised-sm';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        inline-flex items-center justify-center soft-surface soft-transition shrink-0 select-none
        ${getSizeClasses()}
        ${getShapeClasses()}
        ${getVariantClasses()}
        ${onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}
        ${className}
      `}
      style={color ? { color } : undefined}
    >
      {children}
    </div>
  );
};
