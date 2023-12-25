import { configureStore } from '@reduxjs/toolkit';

import { playlistSlice, userSlice, musicPlayerSlice } from './slices';

export const store = configureStore({
  reducer: {
    albumSlice: playlistSlice.reducer,
    userSlice: userSlice.reducer,
    musicPlayerSlice: musicPlayerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
