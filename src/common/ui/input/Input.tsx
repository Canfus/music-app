import classNames from 'classnames';
import { forwardRef, useMemo, useState } from 'react';

import { PasswordHideIcon, PasswordShowIcon } from '@app/common';

import { InputProps } from './input.interface';
import styles from './input.module.css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid, className, id, placeholder, type, value, ...props }, ref) => {
    const [isHiding, setIsHiding] = useState<boolean>(true);

    const inputType = useMemo<React.HTMLInputTypeAttribute | undefined>(() => {
      if (type === 'password') {
        return isHiding ? 'password' : 'text';
      }
      return type;
    }, [type, isHiding]);

    const onToggleHide = () => {
      setIsHiding((prev) => !prev);
    };

    return (
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
          type={inputType}
          className={classNames(styles.input, {
            [styles['input--password']]: type === 'password',
          })}
          id={id}
          placeholder={placeholder}
          value={value}
          {...props}
        />
        <label className={styles.input__label} htmlFor={id}>
          {placeholder}
        </label>
        {type === 'password' && value && (
          <button
            type="button"
            className={styles.input__button}
            onClick={onToggleHide}
          >
            {inputType === 'password' ? (
              <PasswordShowIcon />
            ) : (
              <PasswordHideIcon />
            )}
          </button>
        )}
      </div>
    );
  },
);
