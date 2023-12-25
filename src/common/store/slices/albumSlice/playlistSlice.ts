/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Playlist } from '@app/api';

import type { AlbumSlice } from './playlistSlice.interface';

const initialState: AlbumSlice = {
  playlist: [],
};

export const playlistSlice = createSlice({
  name: 'albumSlice',
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlist = action.payload;
    },
  },
});

export const { setPlaylists } = playlistSlice.actions;
