import classNames from 'classnames';
import { forwardRef, JSX, useMemo } from 'react';
import { createPortal } from 'react-dom';

import {
  SuccessIcon,
  RejectIcon,
  NotificationIcon,
  useNotification,
} from '@app/common';
import { useAppSelector } from '@app/common/store';

import type { NotificationProps } from './notification.interface';
import styles from './notification.module.css';

const notificationRoot: HTMLElement = document.getElementById('notification')!;

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  ({ onSuccess, ...props }, ref) => {
    const { content, title, isOpen, type } = useAppSelector(
      (store) => store.notificationSlice.notification,
    );

    const { closeNotification } = useNotification();

    const render = useMemo<JSX.Element | null>(() => {
      switch (type) {
        case 'success':
          return (
            <>
              <div
                className={classNames(
                  styles.icon__wrapper,
                  styles['icon__wrapper--success'],
                )}
              >
                <SuccessIcon />
              </div>
              <div className={styles.content__wrapper}>
                <p className={styles.content__title}>{title || 'Successful'}</p>
                <p className={styles.content__description}>{content}</p>
              </div>
            </>
          );
        case 'error':
          return (
            <>
              <div
                className={classNames(
                  styles.icon__wrapper,
                  styles['icon__wrapper--error'],
                )}
              >
                <RejectIcon />
              </div>
              <div className={styles.content__wrapper}>
                <p className={styles.content__title}>
                  {title || 'Error occurred'}
                </p>
                <p className={styles.content__description}>{content}</p>
              </div>
            </>
          );
        case 'action':
          return (
            <>
              <div
                className={classNames(
                  styles.icon__wrapper,
                  styles['icon__wrapper--default'],
                )}
              >
                <NotificationIcon />
              </div>
              <div
                className={classNames(
                  styles.content__wrapper,
                  styles['content__wrapper--actions'],
                )}
              >
                <p className={styles.content__title}>{content}</p>
                <div className={styles.content__action}>
                  <button
                    type="button"
                    aria-label="approve action"
                    className={styles.action__button}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (onSuccess) {
                        onSuccess();
                      }
                    }}
                  >
                    <SuccessIcon />
                  </button>
                  <button
                    type="button"
                    aria-label="reject action"
                    className={styles.action__button}
                    onClick={(event) => {
                      event.stopPropagation();
                      closeNotification();
                    }}
                  >
                    <RejectIcon />
                  </button>
                </div>
              </div>
            </>
          );
        default:
          return (
            <>
              <div
                className={classNames(
                  styles.icon__wrapper,
                  styles['icon__wrapper--default'],
                )}
              >
                <NotificationIcon />
              </div>
              <div className={styles.content__wrapper}>
                <p className={styles.content__title}>
                  {title || 'Notification'}
                </p>
                <p className={styles.content__description}>{content}</p>
              </div>
            </>
          );
      }
    }, [closeNotification, content, onSuccess, title, type]);

    if (!isOpen) {
      return null;
    }

    return createPortal(
      <div
        {...props}
        ref={ref}
        className={styles.notification}
        onClick={closeNotification}
        aria-hidden
      >
        {render}
      </div>,
      notificationRoot,
    );
  },
);
