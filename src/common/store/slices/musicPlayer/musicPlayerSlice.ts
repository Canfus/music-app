/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Track } from '@app/api';

import { MusicPlayerSlice } from './musicPlayerSlice.interface';

const initialState: MusicPlayerSlice = {
  track: null,
};

export const musicPlayerSlice = createSlice({
  name: 'musicPlayerSlice',
  initialState,
  reducers: {
    setTrack: (state, action: PayloadAction<Track>) => {
      state.track = action.payload;
    },
  },
});

export const { setTrack } = musicPlayerSlice.actions;
