/**
 * Vice City News Design System - Programmatic Theme Tokens
 * Provides type-safe references to CSS custom properties declared in tokens.css.
 */

export const THEME_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type ThemeBreakpoint = keyof typeof THEME_BREAKPOINTS;

export const THEME_SPACING = {
  0: '0px',
  '0-5': 'var(--space-0-5)',
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  8: 'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
  20: 'var(--space-20)',
} as const;

export type ThemeSpacing = keyof typeof THEME_SPACING;

export const THEME_FONT_SIZES = {
  '2xs': 'var(--font-size-2xs)',
  xs: 'var(--font-size-xs)',
  sm: 'var(--font-size-sm)',
  base: 'var(--font-size-base)',
  md: 'var(--font-size-md)',
  lg: 'var(--font-size-lg)',
  xl: 'var(--font-size-xl)',
  '2xl': 'var(--font-size-2xl)',
  '3xl': 'var(--font-size-3xl)',
  '4xl': 'var(--font-size-4xl)',
  '5xl': 'var(--font-size-5xl)',
} as const;

export type ThemeFontSize = keyof typeof THEME_FONT_SIZES;

export const THEME_RADII = {
  none: 'var(--radius-none)',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  full: 'var(--radius-full)',
} as const;

export type ThemeRadius = keyof typeof THEME_RADII;

export const THEME_ASPECT_RATIOS = {
  video: '16 / 9',
  square: '1 / 1',
  portrait: '3 / 4',
  ultrawide: '21 / 9',
} as const;

export type ThemeAspectRatio = keyof typeof THEME_ASPECT_RATIOS;
