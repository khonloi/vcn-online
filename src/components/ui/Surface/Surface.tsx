import * as React from 'react';
import { clsx } from 'clsx';
import styles from './Surface.module.css';

export type SurfaceVariant = 'card' | 'subtle' | 'muted' | 'glass' | 'elevated';
export type SurfaceBorder = 'none' | 'default' | 'subtle' | 'top' | 'bottom';
export type SurfacePadding = 'none' | 'sm' | 'md' | 'lg';

export interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: SurfaceVariant;
  border?: SurfaceBorder;
  padding?: SurfacePadding;
  className?: string;
  children: React.ReactNode;
}

export const Surface = React.forwardRef<HTMLElement, SurfaceProps>(
  (
    {
      as: Component = 'div',
      variant = 'card',
      border = 'none',
      padding = 'none',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variantClass = {
      card: styles.variantCard,
      subtle: styles.variantSubtle,
      muted: styles.variantMuted,
      glass: styles.variantGlass,
      elevated: styles.variantElevated,
    }[variant];

    const borderClass = {
      none: styles.borderNone,
      default: styles.borderDefault,
      subtle: styles.borderSubtle,
      top: styles.borderTop,
      bottom: styles.borderBottom,
    }[border];

    const paddingClass = {
      none: styles.paddingNone,
      sm: styles.paddingSm,
      md: styles.paddingMd,
      lg: styles.paddingLg,
    }[padding];

    return (
      <Component
        ref={ref}
        className={clsx(styles.surface, variantClass, borderClass, paddingClass, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Surface.displayName = 'Surface';
