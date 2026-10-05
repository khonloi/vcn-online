import * as React from 'react';
import { clsx } from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  errorMessage?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error = false,
      errorMessage,
      leftElement,
      rightElement,
      disabled,
      className,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    const isError = error || Boolean(errorMessage);
    const errorId = id && errorMessage ? `${id}-error` : undefined;

    const sizeClass = {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    }[size];

    return (
      <div className={clsx(styles.inputWrapper, wrapperClassName)}>
        <div
          className={clsx(
            styles.inputContainer,
            sizeClass,
            isError && styles.error,
            disabled && styles.disabled
          )}
        >
          {leftElement && (
            <span className={clsx(styles.adornment, styles.adornmentLeft)} aria-hidden="true">
              {leftElement}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={isError ? true : undefined}
            aria-describedby={errorId}
            className={clsx(styles.input, className)}
            {...props}
          />
          {rightElement && (
            <span className={clsx(styles.adornment, styles.adornmentRight)} aria-hidden="true">
              {rightElement}
            </span>
          )}
        </div>
        {errorMessage && (
          <span id={errorId} className={styles.errorText} role="alert">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
