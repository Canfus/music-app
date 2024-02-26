/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@app/api';

import { UserSlice } from './userSlice.interface';

const initialState: UserSlice = {
  user: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
    updateFavoritePlaylist: ({ user }, action: PayloadAction<string>) => {
      const trackId = action.payload;

      if (user) {
        const favoritePlaylist = user.playlist.find(
          (item) => item.key === 'favorite',
        );

        if (favoritePlaylist) {
          if (favoritePlaylist.music_list.includes(trackId)) {
            favoritePlaylist.music_list = favoritePlaylist.music_list.filter(
              (musicId) => musicId !== trackId,
            );
          } else {
            favoritePlaylist.music_list.push(trackId);
          }
        }
      }
    },
  },
});

export const { setUser, resetUser, updateFavoritePlaylist } = userSlice.actions;
