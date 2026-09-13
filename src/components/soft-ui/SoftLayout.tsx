import React from 'react';

export type GapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AlignOption = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type JustifyOption = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type SurfaceOption = 'none' | 'raised' | 'pressed';

const GAP_MAP: Record<GapSize, string> = {
  none: 'gap-0',
  xs: 'gap-1.5',
  sm: 'gap-3',
  md: 'gap-5',
  lg: 'gap-8',
  xl: 'gap-10',
  '2xl': 'gap-14',
};

const ALIGN_MAP: Record<AlignOption, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const JUSTIFY_MAP: Record<JustifyOption, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export interface SoftRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: GapSize;
  align?: AlignOption;
  justify?: JustifyOption;
  wrap?: boolean;
  surface?: SurfaceOption;
  responsive?: boolean; // wraps to column on small screens
}

export const SoftRow: React.FC<SoftRowProps> = ({
  children,
  gap = 'md',
  align = 'center',
  justify = 'start',
  wrap = true,
  surface = 'none',
  responsive = false,
  className = '',
  ...props
}) => {
  const getSurfaceClass = () => {
    switch (surface) {
      case 'raised':
        return 'soft-surface soft-raised-sm rounded-2xl p-4';
      case 'pressed':
        return 'soft-surface soft-pressed-xs rounded-2xl p-4';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        flex ${responsive ? 'flex-col sm:flex-row' : 'flex-row'}
        ${GAP_MAP[gap]}
        ${ALIGN_MAP[align]}
        ${JUSTIFY_MAP[justify]}
        ${wrap ? 'flex-wrap' : 'flex-nowrap'}
        ${getSurfaceClass()}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export interface SoftColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | 'full';
  gap?: GapSize;
  align?: AlignOption;
  justify?: JustifyOption;
  surface?: SurfaceOption;
}

const SPAN_MAP: Record<number | string, string> = {
  1: 'flex-[1_1_8.333%]',
  2: 'flex-[1_1_16.666%]',
  3: 'flex-[1_1_25%]',
  4: 'flex-[1_1_33.333%]',
  5: 'flex-[1_1_41.666%]',
  6: 'flex-[1_1_50%]',
  7: 'flex-[1_1_58.333%]',
  8: 'flex-[1_1_66.666%]',
  9: 'flex-[1_1_75%]',
  10: 'flex-[1_1_83.333%]',
  11: 'flex-[1_1_91.666%]',
  12: 'flex-[1_1_100%] w-full',
  auto: 'flex-auto',
  full: 'w-full flex-1',
};

export const SoftColumn: React.FC<SoftColumnProps> = ({
  children,
  span,
  gap = 'none',
  align = 'stretch',
  justify = 'start',
  surface = 'none',
  className = '',
  ...props
}) => {
  const getSurfaceClass = () => {
    switch (surface) {
      case 'raised':
        return 'soft-surface soft-raised-sm rounded-2xl p-4';
      case 'pressed':
        return 'soft-surface soft-pressed-xs rounded-2xl p-4';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        flex flex-col
        ${span ? SPAN_MAP[span] : 'flex-1'}
        ${GAP_MAP[gap]}
        ${ALIGN_MAP[align]}
        ${JUSTIFY_MAP[justify]}
        ${getSurfaceClass()}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
