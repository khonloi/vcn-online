import * as React from 'react';
import { clsx } from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'default'
  | 'breaking'
  | 'success'
  | 'warning'
  | 'info'
  | 'outline'
  | 'subtle'
  | 'market-positive'
  | 'market-negative';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'sm', className, children, ...props }, ref) => {
    const variantClass = {
      default: styles.variantDefault,
      breaking: styles.variantBreaking,
      success: styles.variantSuccess,
      warning: styles.variantWarning,
      info: styles.variantInfo,
      outline: styles.variantOutline,
      subtle: styles.variantSubtle,
      'market-positive': styles.variantMarketPositive,
      'market-negative': styles.variantMarketNegative,
    }[variant];

    const sizeClass = {
      sm: styles.sizeSm,
      md: styles.sizeMd,
    }[size];

    return (
      <span ref={ref} className={clsx(styles.badge, variantClass, sizeClass, className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
