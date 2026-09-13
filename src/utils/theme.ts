import { useState, useEffect, useCallback } from 'react';

export type ThemeName = 'classic' | 'dark' | 'warm' | 'lavender';

export interface ThemeOption {
  id: ThemeName;
  name: string;
  bgHex: string;
  dotColor: string;
}

export const THEMES: ThemeOption[] = [
  { id: 'classic', name: 'Classic Gray', bgHex: '#e2e8f0', dotColor: '#4d7cfe' },
  { id: 'dark', name: 'Dark Slate', bgHex: '#1c1f26', dotColor: '#5e8cf6' },
  { id: 'warm', name: 'Warm Cream', bgHex: '#eae5dc', dotColor: '#e07a5f' },
  { id: 'lavender', name: 'Soft Lavender', bgHex: '#e6e8f4', dotColor: '#7c5cff' },
];

/**
 * Applies the given theme and elevation shadow scale to the document root element.
 */
export function applyTheme(theme: ThemeName, shadowDepth: number = 1): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // 1. Data-theme attribute
  if (theme === 'classic') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }

  // 2. Class-based selectors for compatibility
  root.classList.remove('theme-classic', 'theme-dark', 'theme-warm', 'theme-lavender');
  root.classList.add(`theme-${theme}`);

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // 3. Shadow scales based on depth
  const scale = shadowDepth;
  const s1 = Math.round(7 * scale);
  const s2 = Math.round(14 * scale);
  const in1 = Math.round(4 * scale);
  const in2 = Math.round(8 * scale);

  root.style.setProperty(
    '--soft-shadow-xs',
    `${Math.round(2 * scale)}px ${Math.round(2 * scale)}px ${Math.round(5 * scale)}px var(--shadow-dark), -${Math.round(2 * scale)}px -${Math.round(2 * scale)}px ${Math.round(5 * scale)}px var(--shadow-light)`
  );
  root.style.setProperty(
    '--soft-shadow-sm',
    `${Math.round(4 * scale)}px ${Math.round(4 * scale)}px ${Math.round(8 * scale)}px var(--shadow-dark), -${Math.round(4 * scale)}px -${Math.round(4 * scale)}px ${Math.round(8 * scale)}px var(--shadow-light)`
  );
  root.style.setProperty(
    '--soft-shadow-md',
    `${s1}px ${s1}px ${s2}px var(--shadow-dark), -${s1}px -${s1}px ${s2}px var(--shadow-light)`
  );
  root.style.setProperty(
    '--soft-shadow-lg',
    `${Math.round(12 * scale)}px ${Math.round(12 * scale)}px ${Math.round(24 * scale)}px var(--shadow-dark), -${Math.round(12 * scale)}px -${Math.round(12 * scale)}px ${Math.round(24 * scale)}px var(--shadow-light)`
  );

  // Inset shadow properties
  root.style.setProperty(
    '--shadow-raised-md',
    `${s1}px ${s1}px ${s2}px var(--shadow-dark), -${s1}px -${s1}px ${s2}px var(--shadow-light)`
  );
  root.style.setProperty(
    '--shadow-pressed-md',
    `inset ${in1}px ${in1}px ${in2}px var(--shadow-inset-dark), inset -${in1}px -${in1}px ${in2}px var(--shadow-inset-light)`
  );

  // 4. Softened shadow opacities for lower depths
  if (scale <= 0.6) {
    if (theme === 'dark') {
      root.style.setProperty('--shadow-light', 'rgba(43, 49, 61, 0.55)');
      root.style.setProperty('--shadow-dark', 'rgba(13, 15, 19, 0.72)');
    } else {
      root.style.setProperty('--shadow-light', 'rgba(255, 255, 255, 0.72)');
      root.style.setProperty('--shadow-dark', 'rgba(163, 177, 198, 0.48)');
    }
  } else {
    root.style.removeProperty('--shadow-light');
    root.style.removeProperty('--shadow-dark');
  }
}

/**
 * React hook to manage theme and elevation depth.
 */
export function useTheme(initialTheme: ThemeName = 'classic', initialDepth: number = 1) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(initialTheme);
  const [shadowDepth, setShadowDepth] = useState<number>(initialDepth);

  useEffect(() => {
    applyTheme(currentTheme, shadowDepth);
  }, [currentTheme, shadowDepth]);

  const resetCustomizations = useCallback(() => {
    setCurrentTheme('classic');
    setShadowDepth(1);
  }, []);

  return {
    currentTheme,
    setCurrentTheme,
    shadowDepth,
    setShadowDepth,
    resetCustomizations,
    themes: THEMES,
  };
}
