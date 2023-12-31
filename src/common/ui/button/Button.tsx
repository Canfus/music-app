import classNames from 'classnames';
import { forwardRef } from 'react';

import { ButtonProps } from './button.interface';
import styles from './button.module.css';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'medium', className, children, ...props },
    ref,
  ) => (
    <button
      {...props}
      ref={ref}
      className={classNames(styles.button, {
        [styles['button--primary']]: variant === 'primary',
        [styles['button--secondary']]: variant === 'secondary',
        [styles['button--plain']]: variant === 'plain',
        [styles['button--outlined']]: variant === 'outlined',
        [styles['button--large']]: size === 'large',
        [styles['button--medium']]: size === 'medium',
      })}
    >
      {children}
    </button>
  ),
);
