import * as React from 'react';
import { clsx } from 'clsx';
import styles from './Separator.module.css';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  variant?: 'default' | 'subtle' | 'strong';
  className?: string;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { orientation = 'horizontal', decorative = true, variant = 'default', className, ...props },
    ref
  ) => {
    const orientationClass = orientation === 'vertical' ? styles.vertical : styles.horizontal;
    const variantClass = {
      default: '',
      subtle: styles.subtle,
      strong: styles.strong,
    }[variant];

    const semanticProps = decorative
      ? { 'aria-hidden': true }
      : { role: 'separator', 'aria-orientation': orientation };

    return (
      <div
        ref={ref}
        className={clsx(styles.separator, orientationClass, variantClass, className)}
        {...semanticProps}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';
