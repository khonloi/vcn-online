import * as React from 'react';
import { clsx } from 'clsx';
import styles from './Card.module.css';

export type CardVariant = 'flat' | 'bordered' | 'elevated' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardOrientation = 'vertical' | 'horizontal';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: CardVariant;
  padding?: CardPadding;
  orientation?: CardOrientation;
  className?: string;
  children: React.ReactNode;
}

export const CardRoot = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      as: Component = 'article',
      variant = 'bordered',
      padding = 'none',
      orientation = 'vertical',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variantClass = {
      flat: styles.variantFlat,
      bordered: styles.variantBordered,
      elevated: styles.variantElevated,
      interactive: styles.variantInteractive,
    }[variant];

    const paddingClass = {
      none: styles.paddingNone,
      sm: styles.paddingSm,
      md: styles.paddingMd,
      lg: styles.paddingLg,
    }[padding];

    const orientationClass = orientation === 'horizontal' ? styles.horizontal : styles.vertical;

    return (
      <Component
        ref={ref}
        className={clsx(styles.card, variantClass, paddingClass, orientationClass, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
CardRoot.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.header, className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'Card.Header';

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.body, className)} {...props}>
      {children}
    </div>
  )
);
CardBody.displayName = 'Card.Body';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.footer, className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'Card.Footer';

export const CardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.media, className)} {...props}>
      {children}
    </div>
  )
);
CardMedia.displayName = 'Card.Media';

export interface CardComponent extends React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLElement>
> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Media: typeof CardMedia;
}

export const Card = CardRoot as CardComponent;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Media = CardMedia;
