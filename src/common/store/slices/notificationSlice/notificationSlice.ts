/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  SliceProps,
  Notification,
  NotificationId,
} from './notificationSlice.interface';

const initialState: SliceProps = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {
    append: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    remove: (state, action: PayloadAction<NotificationId>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
  },
});

export const { remove, append } = notificationSlice.actions;
