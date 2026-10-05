import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import styles from './Flex.module.css';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexGap = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 'none';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  gap?: FlexGap;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      inline = false,
      direction = 'row',
      align = 'stretch',
      justify = 'start',
      wrap = 'nowrap',
      gap = 'none',
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'div';

    const directionClass = {
      row: styles.directionRow,
      'row-reverse': styles.directionRowReverse,
      column: styles.directionColumn,
      'column-reverse': styles.directionColumnReverse,
    }[direction];

    const alignClass = {
      start: styles.alignStart,
      center: styles.alignCenter,
      end: styles.alignEnd,
      baseline: styles.alignBaseline,
      stretch: styles.alignStretch,
    }[align];

    const justifyClass = {
      start: styles.justifyStart,
      center: styles.justifyCenter,
      end: styles.justifyEnd,
      between: styles.justifyBetween,
      around: styles.justifyAround,
      evenly: styles.justifyEvenly,
    }[justify];

    const wrapClass = {
      nowrap: styles.wrapNowrap,
      wrap: styles.wrapWrap,
      'wrap-reverse': styles.wrapWrapReverse,
    }[wrap];

    const gapClass = {
      none: styles.gapNone,
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
    }[gap];

    return (
      <Component
        ref={ref}
        className={clsx(
          inline ? styles.inline : styles.flex,
          directionClass,
          alignClass,
          justifyClass,
          wrapClass,
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

Flex.displayName = 'Flex';

export interface StackProps extends Omit<FlexProps, 'direction'> {
  direction?: 'vertical' | 'horizontal';
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction = 'vertical', gap = 4, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        direction={direction === 'vertical' ? 'column' : 'row'}
        gap={gap}
        {...props}
      />
    );
  }
);

Stack.displayName = 'Stack';

export default Flex;
