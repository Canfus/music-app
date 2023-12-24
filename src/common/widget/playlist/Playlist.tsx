import { FC } from 'react';
import classNames from 'classnames';

import { Track } from '@app/common';

import type { PlaylistProps } from './playlist.interface';
import styles from './playlist.module.css';

export const Playlist: FC<PlaylistProps> = ({
  playlist,
  className,
  ...props
}) => (
  <div className={classNames(styles.playlist__wrapper, className)} {...props}>
    <h2 className={styles.playlist__title}>{playlist.title}</h2>
    <div className={styles.playlist__list}>
      {playlist.music_list.map((track) => (
        <Track
          key={track.id}
          onClick={() => console.log(track.id)}
          className={styles.track}
          track={track}
        />
      ))}
    </div>
  </div>
);
