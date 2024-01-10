import classNames from 'classnames';

import {
  useAppSelector,
  useAppDispatch,
  setCurrentPlaylist,
} from '@app/common/store';

import type { PlaylistThumbProps } from './playlistThumb.interface';
import styles from './playlistThumb.module.css';

export const PlaylistThumb = ({
  playlist,
  className,
  ...props
}: PlaylistThumbProps) => {
  const dispatch = useAppDispatch();

  const { currentPlaylist } = useAppSelector((store) => store.albumSlice);

  return (
    <div
      {...props}
      className={classNames(
        styles.playlist__wrapper,
        {
          [styles['playlist--selected']]: currentPlaylist?.id === playlist.id,
        },
        className,
      )}
      onClick={() => dispatch(setCurrentPlaylist(playlist))}
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
        {/* TODO: fix to real author name */}
        <p className={styles.description__author}>{playlist.title}</p>
        <p className={styles.description__name}>Worldspawn</p>
      </div>
    </div>
  );
};
