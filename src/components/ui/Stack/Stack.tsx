import * as React from 'react';
import { clsx } from 'clsx';
import styles from './Stack.module.css';

export type StackDirection = 'row' | 'column';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type StackGap = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 'none';

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  gap?: StackGap;
  className?: string;
  children: React.ReactNode;
}

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      as: Component = 'div',
      direction = 'column',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      gap = 'none',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const directionClass = direction === 'row' ? styles.directionRow : styles.directionColumn;

    const alignClass = {
      start: styles.alignStart,
      center: styles.alignCenter,
      end: styles.alignEnd,
      stretch: styles.alignStretch,
      baseline: styles.alignBaseline,
    }[align];

    const justifyClass = {
      start: styles.justifyStart,
      center: styles.justifyCenter,
      end: styles.justifyEnd,
      between: styles.justifyBetween,
      around: styles.justifyAround,
      evenly: styles.justifyEvenly,
    }[justify];

    const gapClass =
      gap !== 'none'
        ? {
            1: styles.gap1,
            2: styles.gap2,
            3: styles.gap3,
            4: styles.gap4,
            5: styles.gap5,
            6: styles.gap6,
            8: styles.gap8,
            10: styles.gap10,
            12: styles.gap12,
            16: styles.gap16,
          }[gap]
        : undefined;

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.stack,
          directionClass,
          alignClass,
          justifyClass,
          wrap && styles.wrap,
          gapClass,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';

export const VStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} direction="column" {...props} />
));
VStack.displayName = 'VStack';

export const HStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} direction="row" {...props} />
));
HStack.displayName = 'HStack';
