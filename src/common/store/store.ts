import { configureStore } from '@reduxjs/toolkit';

import { albumSlice } from './slices';

export const store = configureStore({
  reducer: {
    albumSlice: albumSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
