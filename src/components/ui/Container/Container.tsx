import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import styles from './Container.module.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'fluid';
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', asChild = false, className, children, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';

    const sizeClass = {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
      fluid: styles.sizeFluid,
    }[size];

    return (
      <Component ref={ref} className={clsx(styles.container, sizeClass, className)} {...props}>
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export default Container;
