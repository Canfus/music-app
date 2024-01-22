/* eslint-disable no-confusing-arrow, implicit-arrow-linebreak */
import { FC } from 'react';
import classNames from 'classnames';

import { Track } from '@app/common';
import { useAppDispatch, setTrack, useAppSelector } from '@app/common/store';

import type { PlaylistProps } from './playlist.interface';
import styles from './playlist.module.css';

export const Playlist: FC<PlaylistProps> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();

  const playlist = useAppSelector((store) => store.albumSlice.currentPlaylist);

  return playlist ? (
    <div {...props} className={classNames(styles.playlist__wrapper, className)}>
      <div className={styles.playlist}>
        <img
          src={playlist.photo}
          alt={playlist.title}
          className={styles.playlist__photo}
        />
        <div className={styles.playlist__info}>
          <h2 className={styles.playlist__title}>{playlist.title}</h2>
          <p className={styles.playlist__author}>{playlist.author}</p>
          <p className={styles.playlist__count}>
            {`${playlist.music_list.length} tracks`}
          </p>
          <p className={styles.playlist__description}>{playlist.description}</p>
        </div>
      </div>
      <div className={styles.playlist__list}>
        {playlist.music_list.map((track) => (
          <Track
            key={track._id}
            onClick={() => dispatch(setTrack(track))}
            className={styles.track}
            track={track}
          />
        ))}
      </div>
    </div>
  ) : (
    <div
      {...props}
      className={classNames(styles['playlist__wrapper--empty'], className)}
    >
      Select your best playlist
    </div>
  );
};
