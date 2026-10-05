'use client';

import * as React from 'react';
import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', href, asChild = false, className, children, ...props },
    ref
  ) => {
    const variantClass = {
      primary: styles.variantPrimary,
      secondary: styles.variantSecondary,
      outline: styles.variantOutline,
      ghost: styles.variantGhost,
      destructive: styles.variantDestructive,
    }[variant];

    const sizeClass = {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    }[size];

    const combinedClassName = clsx(styles.button, variantClass, sizeClass, className);

    if (asChild) {
      return (
        <Slot className={combinedClassName} ref={ref as React.Ref<HTMLElement>} {...props}>
          {children}
        </Slot>
      );
    }

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
