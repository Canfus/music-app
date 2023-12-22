/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Track } from '@app/api';

import type { AlbumSlice } from './albumSlice.interface';

const initialState: AlbumSlice = {
  trackList: [],
};

export const albumSlice = createSlice({
  name: 'albumSlice',
  initialState,
  reducers: {
    setAlbum: (state, action: PayloadAction<Track[]>) => {
      state.trackList = action.payload;
    },
  },
});

export const { setAlbum } = albumSlice.actions;
