import { useLayoutEffect } from 'react';

import { Playlist } from '@app/common';
import { useAppDispatch, setPlaylists, setTrack } from '@app/common/store';
import { usePlaylistsQuery } from '@app/api';

import styles from './main.module.css';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const { data: playlists } = usePlaylistsQuery();

  useLayoutEffect(() => {
    dispatch(setPlaylists(playlists));
    dispatch(setTrack(playlists[0].music_list[2]));
  }, [dispatch, playlists]);

  return (
    <div className={styles.playlists}>
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};
