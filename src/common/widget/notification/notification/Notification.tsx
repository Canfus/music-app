/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import { forwardRef, JSX, useMemo } from 'react';
import { motion } from 'framer-motion';

import {
  SuccessIcon,
  RejectIcon,
  NotificationIcon,
  useNotification,
} from '@app/common';

import type { NotificationProps } from './notification.interface';
import styles from './notification.module.css';

export const NotificationElement = forwardRef<
  HTMLDivElement,
  NotificationProps
>(({ onSuccess, notification, ...props }, ref) => {
  const { closeNotification } = useNotification();
  const { type, id, title, content } = notification;

  const onCloseNotification = () => {
    closeNotification(id);
  };

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
              <p className={styles.content__title}>
                {title || 'Are you sure?'}
              </p>
              {content}
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
              <p className={styles.content__title}>{title || 'Notification'}</p>
              <p className={styles.content__description}>{content}</p>
            </div>
          </>
        );
    }
  }, [content, title, type]);

  return (
    <motion.div
      {...props}
      layout
      transition={{ type: 'spring', bounce: 0.3, velocity: 2 }}
      animate={{ transform: 'translateX(0)' }}
      exit={{ transform: 'translateX(120%)' }}
      ref={ref}
      className={styles.notification}
      onClick={onCloseNotification}
      role="alert"
      aria-hidden
    >
      {render}
    </motion.div>
  );
});
