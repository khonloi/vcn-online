import * as React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  error?: boolean;
  wrapperClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error = false, disabled = false, className, wrapperClassName, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <label
        htmlFor={inputId}
        className={clsx(styles.checkboxWrapper, disabled && styles.disabled, wrapperClassName)}
      >
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          className={styles.nativeInput}
          {...props}
        />
        <span
          className={clsx(styles.indicator, error && styles.error, className)}
          aria-hidden="true"
        >
          <Check className={styles.checkIcon} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
