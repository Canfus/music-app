import classNames from 'classnames';

import {
  useAppSelector,
  useAppDispatch,
  setCurrentPlaylist,
} from '@app/common/store';
import { usePlaylistMutation } from '@app/api';

import type { PlaylistThumbProps } from './playlistThumb.interface';
import styles from './playlistThumb.module.css';

export const PlaylistThumb = ({
  playlist,
  className,
  ...props
}: PlaylistThumbProps) => {
  const dispatch = useAppDispatch();

  const currentPlaylist = useAppSelector(
    (store) => store.albumSlice.currentPlaylist,
  );

  const { mutate } = usePlaylistMutation({
    onSuccess: (newPlaylist) => {
      dispatch(setCurrentPlaylist(newPlaylist));
    },
  });

  const onPlaylistSelect = () => {
    if (currentPlaylist?._id !== playlist._id) {
      mutate(playlist._id);
    }
  };

  return (
    <div
      {...props}
      className={classNames(
        styles.playlist__wrapper,
        {
          [styles['playlist--selected']]: currentPlaylist?._id === playlist._id,
        },
        className,
      )}
      onClick={onPlaylistSelect}
      role="button"
      tabIndex={0}
      aria-hidden
      aria-label={`Select playlist ${playlist.title}`}
    >
      <img
        src={playlist.photo}
        alt={playlist.photo}
        className={styles.playlist__photo}
        draggable={false}
      />
      <div className={styles.playlist__description}>
        <p className={styles.description__author}>{playlist.title}</p>
        <p className={styles.description__name}>{playlist.author}</p>
      </div>
    </div>
  );
};
