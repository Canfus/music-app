import { configureStore } from '@reduxjs/toolkit';

import {
  playlistSlice,
  userSlice,
  musicPlayerSlice,
  notificationSlice,
} from './slices';

export const store = configureStore({
  reducer: {
    albumSlice: playlistSlice.reducer,
    userSlice: userSlice.reducer,
    musicPlayerSlice: musicPlayerSlice.reducer,
    notificationSlice: notificationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
