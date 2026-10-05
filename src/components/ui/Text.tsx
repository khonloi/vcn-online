import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import styles from './Text.module.css';

export type TextElement = 'p' | 'span' | 'div' | 'label' | 'small' | 'time' | 'strong' | 'em';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextFont = 'sans' | 'serif';
export type TextColor =
  'primary' | 'secondary' | 'muted' | 'accent' | 'inverse' | 'success' | 'warning' | 'error';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  font?: TextFont;
  color?: TextColor;
  italic?: boolean;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'p',
      size = 'base',
      weight = 'normal',
      font = 'sans',
      color = 'primary',
      italic = false,
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = (asChild ? Slot : as) as React.ElementType;

    const sizeClass = {
      xs: styles.sizeXs,
      sm: styles.sizeSm,
      base: styles.sizeBase,
      lg: styles.sizeLg,
      xl: styles.sizeXl,
    }[size];

    const weightClass = {
      normal: styles.weightNormal,
      medium: styles.weightMedium,
      semibold: styles.weightSemibold,
      bold: styles.weightBold,
    }[weight];

    const fontClass = {
      sans: styles.fontSans,
      serif: styles.fontSerif,
    }[font];

    const colorClass = {
      primary: styles.colorPrimary,
      secondary: styles.colorSecondary,
      muted: styles.colorMuted,
      accent: styles.colorAccent,
      inverse: styles.colorInverse,
      success: styles.colorSuccess,
      warning: styles.colorWarning,
      error: styles.colorError,
    }[color];

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.text,
          sizeClass,
          weightClass,
          fontClass,
          colorClass,
          italic && styles.italic,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export default Text;
