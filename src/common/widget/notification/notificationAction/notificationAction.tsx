import { RejectIcon, SuccessIcon, useNotification } from '@app/common';

import type { NotificationActionProps } from './notificationAction.interface';
import styles from './notificationAction.module.css';

export const NotificationAction = ({
  onSuccess,
  ...props
}: NotificationActionProps) => {
  const { closeNotification } = useNotification();

  return (
    <div {...props} className={styles.content__action}>
      <button
        type="button"
        aria-label="approve action"
        className={styles.action__button}
        onClick={(event) => {
          event.stopPropagation();
          if (onSuccess) {
            onSuccess();
            closeNotification();
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
  );
};
