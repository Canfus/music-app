import { useCallback } from 'react';

import { useAppDispatch, append, remove, getId } from '@app/common';
import type { Notification, NotificationId } from './useNotification.interface';

import { TIMER_AUTO_CLOSE } from './useNotification.constants';

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const callNotification = useCallback(
    (props: Omit<Notification, 'id'>) => {
      const uniqueId = getId();

      dispatch(
        append({
          id: uniqueId,
          ...props,
        }),
      );

      setTimeout(() => {
        dispatch(remove(uniqueId));
      }, TIMER_AUTO_CLOSE);
    },
    [dispatch],
  );

  const closeNotification = useCallback(
    (id: NotificationId) => {
      dispatch(remove(id));
    },
    [dispatch],
  );

  return { callNotification, closeNotification };
};
