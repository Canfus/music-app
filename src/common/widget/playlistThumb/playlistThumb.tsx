import classNames from 'classnames';

import {
  useAppSelector,
  useAppDispatch,
  setCurrentPlaylist,
} from '@app/common/store';
import { usePlaylistQuery } from '@app/api';
import { Loader } from '@app/common';

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

  const { refetch, isFetching: isLoading } = usePlaylistQuery(playlist._id);

  const onPlaylistSelect = () => {
    if (currentPlaylist?._id !== playlist._id) {
      refetch().then(({ data }) => {
        if (data) {
          dispatch(setCurrentPlaylist(data));
        }
      });
    }
  };

  return (
    <div
      {...props}
      className={classNames(
        styles.playlist__wrapper,
        {
          [styles['playlist--selected']]: currentPlaylist?._id === playlist._id,
          [styles['playlist--loading']]: isLoading,
        },
        className,
      )}
      onClick={onPlaylistSelect}
      role="button"
      tabIndex={0}
      aria-hidden
      aria-label={`Select playlist ${playlist.title}`}
    >
      {isLoading && (
        <div className={styles.playlist__loader}>
          <Loader />
        </div>
      )}
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
