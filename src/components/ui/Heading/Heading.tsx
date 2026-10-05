import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import styles from './Heading.module.css';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type HeadingFont = 'headline' | 'sans' | 'serif';
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
export type HeadingColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'breaking' | 'inverse';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel | 'span' | 'div';
  size?: HeadingSize;
  font?: HeadingFont;
  weight?: HeadingWeight;
  color?: HeadingColor;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

const defaultSizes: Record<HeadingLevel, HeadingSize> = {
  h1: '4xl',
  h2: '3xl',
  h3: '2xl',
  h4: 'xl',
  h5: 'lg',
  h6: 'md',
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as = 'h2',
      size,
      font = 'headline',
      weight = 'bold',
      color = 'primary',
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : as;
    const resolvedSize = size ?? (as in defaultSizes ? defaultSizes[as as HeadingLevel] : '2xl');

    const sizeClass = {
      '5xl': styles.size5xl,
      '4xl': styles.size4xl,
      '3xl': styles.size3xl,
      '2xl': styles.size2xl,
      xl: styles.sizeXl,
      lg: styles.sizeLg,
      md: styles.sizeMd,
      sm: styles.sizeSm,
      xs: styles.sizeXs,
    }[resolvedSize];

    const fontClass = {
      headline: styles.fontHeadline,
      sans: styles.fontSans,
      serif: styles.fontSerif,
    }[font];

    const weightClass = {
      normal: styles.weightNormal,
      medium: styles.weightMedium,
      semibold: styles.weightSemibold,
      bold: styles.weightBold,
      black: styles.weightBlack,
    }[weight];

    const colorClass = {
      primary: styles.colorPrimary,
      secondary: styles.colorSecondary,
      muted: styles.colorMuted,
      accent: styles.colorAccent,
      breaking: styles.colorBreaking,
      inverse: styles.colorInverse,
    }[color];

    return (
      <Component
        ref={ref as React.Ref<HTMLHeadingElement>}
        className={clsx(styles.heading, fontClass, sizeClass, weightClass, colorClass, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
