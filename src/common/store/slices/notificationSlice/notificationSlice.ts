/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  NotificationSlice,
  NotificationContentProps,
} from './notificationSlice.interface';

const initialState: NotificationSlice = {
  notification: {
    isOpen: false,
    content: null,
  },
};

export const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {
    close: (state) => {
      state.notification.isOpen = false;
      state.notification.content = null;
      state.notification.title = undefined;
      state.notification.type = undefined;
    },
    open: (state, action: PayloadAction<NotificationContentProps>) => {
      const { content, title, type } = action.payload;

      state.notification.isOpen = true;
      state.notification.type = type;
      state.notification.content = content;
      state.notification.title = title;
    },
  },
});

export const { close, open } = notificationSlice.actions;
