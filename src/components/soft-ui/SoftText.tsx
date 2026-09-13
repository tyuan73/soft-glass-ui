import React from 'react';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';

export type TextWeight =
  'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

export type TextColor =
  'default' | 'muted' | 'subtle' | 'primary' | 'success' | 'danger' | 'warning';

export interface SoftTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  // Boolean shortcut props for variant
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  body?: boolean;
  caption?: boolean;
  small?: boolean;

  // Formatting modifiers (can be freely combined)
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;

  // Weight
  weight?: TextWeight;

  // Color
  color?: TextColor;

  // Polymorphic element override
  as?: React.ElementType;

  className?: string;
  children?: React.ReactNode;
}

const VARIANT_STYLES: Record<TextVariant, string> = {
  h1: 'text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight',
  h2: 'text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight',
  h3: 'text-2xl sm:text-3xl font-bold tracking-tight leading-snug',
  h4: 'text-xl sm:text-2xl font-bold leading-snug',
  h5: 'text-lg font-bold leading-normal',
  h6: 'text-sm sm:text-base font-semibold uppercase tracking-wider leading-normal',
  body: 'text-sm sm:text-base leading-relaxed',
  caption: 'text-xs tracking-wide leading-normal',
  small: 'text-xs leading-normal',
};

const WEIGHT_STYLES: Record<TextWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

const COLOR_STYLES: Record<TextColor, string> = {
  default: 'text-[var(--soft-text)]',
  muted: 'text-[var(--soft-text-muted)]',
  subtle: 'text-[var(--soft-text-subtle)]',
  primary: 'text-[var(--soft-primary)]',
  success: 'text-[var(--soft-success)]',
  danger: 'text-[var(--soft-danger)]',
  warning: 'text-amber-600 dark:text-amber-400',
};

export const SoftText: React.FC<SoftTextProps> = ({
  variant,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  body,
  caption,
  small,
  bold = false,
  italic = false,
  strikethrough = false,
  underline = false,
  weight,
  color = 'default',
  as,
  className = '',
  children,
  ...props
}) => {
  // Resolve variant from boolean flags or explicit prop (defaults to 'body')
  let resolvedVariant: TextVariant = variant || 'body';
  if (h1) resolvedVariant = 'h1';
  else if (h2) resolvedVariant = 'h2';
  else if (h3) resolvedVariant = 'h3';
  else if (h4) resolvedVariant = 'h4';
  else if (h5) resolvedVariant = 'h5';
  else if (h6) resolvedVariant = 'h6';
  else if (caption) resolvedVariant = 'caption';
  else if (small) resolvedVariant = 'small';
  else if (body) resolvedVariant = 'body';

  // Default tag mapping
  const Component =
    as ||
    (resolvedVariant === 'h1'
      ? 'h1'
      : resolvedVariant === 'h2'
        ? 'h2'
        : resolvedVariant === 'h3'
          ? 'h3'
          : resolvedVariant === 'h4'
            ? 'h4'
            : resolvedVariant === 'h5'
              ? 'h5'
              : resolvedVariant === 'h6'
                ? 'h6'
                : resolvedVariant === 'small'
                  ? 'small'
                  : resolvedVariant === 'caption'
                    ? 'span'
                    : 'p');

  const variantClass = VARIANT_STYLES[resolvedVariant];
  const weightClass = weight ? WEIGHT_STYLES[weight] : bold ? 'font-bold' : '';
  const colorClass = COLOR_STYLES[color];

  const formattingClasses = [
    italic ? 'italic' : '',
    strikethrough ? 'line-through' : '',
    underline ? 'underline underline-offset-4 decoration-current' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={`
        ${variantClass}
        ${weightClass}
        ${colorClass}
        ${formattingClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

// Aliased export for convenient <Text ...> usage
export const Text = SoftText;

export default SoftText;
