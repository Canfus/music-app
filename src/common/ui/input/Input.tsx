import classNames from 'classnames';
import { forwardRef } from 'react';

import { InputProps } from './input.interface';
import styles from './input.module.css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid, className, id, placeholder, ...props }, ref) => (
    <div
      className={classNames(
        styles.input__wrapper,
        {
          [styles['input--invalid']]: invalid,
        },
        className,
      )}
    >
      <input
        ref={ref}
        className={styles.input}
        id={id}
        placeholder={placeholder}
        {...props}
      />
      <label className={styles.input__label} htmlFor={id}>
        {placeholder}
      </label>
    </div>
  ),
);
