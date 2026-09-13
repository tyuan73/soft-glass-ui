export type SoftElevation = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type SoftVariant = 'raised' | 'pressed' | 'flat' | 'convex' | 'concave';
export type SoftRadius = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'pill';
export type SoftSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';

/**
 * Returns the CSS class for soft elevation shadow based on variant and level.
 */
export function getElevationClass(
  elevation: SoftElevation = 'md',
  variant: SoftVariant = 'raised'
): string {
  if (variant === 'convex') return 'soft-convex';
  if (variant === 'concave') return 'soft-concave';
  if (variant === 'flat') return 'border border-white/20';

  if (variant === 'pressed') {
    switch (elevation) {
      case 'xs':
        return 'soft-pressed-xs';
      case 'sm':
        return 'soft-pressed-sm';
      case 'lg':
      case 'xl':
        return 'soft-pressed-lg';
      case 'none':
        return '';
      default:
        return 'soft-pressed-md';
    }
  }

  switch (elevation) {
    case 'xs':
      return 'soft-raised-xs';
    case 'sm':
      return 'soft-raised-sm';
    case 'lg':
      return 'soft-raised-lg';
    case 'xl':
      return 'soft-raised-xl';
    case 'none':
      return '';
    default:
      return 'soft-raised-md';
  }
}

/**
 * Returns the CSS class for border radius token.
 */
export function getRadiusClass(radius: SoftRadius = '2xl'): string {
  switch (radius) {
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
      return 'rounded-2xl';
  }
}
