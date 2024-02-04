import { useCallback, useRef } from 'react';

import type { NotificationContentProps } from '@app/common/store';
import { useAppSelector, useAppDispatch, close, open } from '@app/common/store';

import { TIMER_AUTO_CLOSE } from './useNotification.constants';

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector(
    (store) => store.notificationSlice.notification,
  );

  const timerId = useRef<NodeJS.Timeout | null>(null);

  const callNotification = useCallback(
    ({ autoClose = TIMER_AUTO_CLOSE, ...props }: NotificationContentProps) => {
      if (!isOpen) {
        dispatch(open(props));
      }

      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(() => {
        dispatch(close());
      }, autoClose);
    },
    [dispatch, isOpen],
  );

  const closeNotification = useCallback(() => {
    dispatch(close());
  }, [dispatch]);

  return { callNotification, closeNotification };
};
