import classNames from 'classnames';
import { forwardRef } from 'react';

import { IconButtonProps } from './iconButton.interface';
import styles from './iconButton.module.css';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'medium', variant = 'plain', icon, className, ...props }, ref) => (
    <button
      ref={ref}
      className={classNames(
        styles.button,
        {
          [styles['button--large']]: size === 'large',
          [styles['button--medium']]: size === 'medium',
          [styles['button--primary']]: variant === 'primary',
          [styles['button--plain']]: variant === 'plain',
          [styles['button--outlined']]: variant === 'outlined',
        },
        className,
      )}
      {...props}
    >
      <div className={styles.button__icon}>{icon}</div>
    </button>
  ),
);
IconButton.displayName = 'IconButton';
