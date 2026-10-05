import * as React from 'react';
import { clsx } from 'clsx';
import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, disabled = false, className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={clsx(
          styles.label,
          required && styles.required,
          disabled && styles.disabled,
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;
