/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Playlist } from '@app/api';

import type { AlbumSlice } from './playlistSlice.interface';

const initialState: AlbumSlice = {
  playlist: [],
  currentPlaylist: null,
};

export const playlistSlice = createSlice({
  name: 'albumSlice',
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlist = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.currentPlaylist = action.payload;
    },
    clearCurrentPlaylist: (state) => {
      state.currentPlaylist = null;
    },
  },
});

// eslint-disable-next-line operator-linebreak
export const { setPlaylists, setCurrentPlaylist, clearCurrentPlaylist } =
  playlistSlice.actions;
