import { useLayoutEffect } from 'react';

import { PlaylistThumb, Playlist, Header } from '@app/common';
import { useAppDispatch, setPlaylists, setTrack } from '@app/common/store';
import { usePlaylistsQuery } from '@app/api';

import styles from './main.module.css';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const { data: playlists } = usePlaylistsQuery();

  useLayoutEffect(() => {
    dispatch(setPlaylists(playlists));
    dispatch(setTrack(playlists[0].music_list[0]));
  }, [dispatch, playlists]);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.page__playlists__wrapper}>
        <div className={styles.page__playlists}>
          {playlists.map((playlist) => (
            <PlaylistThumb key={playlist._id} playlist={playlist} />
          ))}
        </div>
        <Playlist className={styles.playlist__selected} />
      </div>
    </div>
  );
};
