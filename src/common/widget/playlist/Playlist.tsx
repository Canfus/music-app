/* eslint-disable no-confusing-arrow, implicit-arrow-linebreak */
import { FC } from 'react';
import classNames from 'classnames';

import { Track } from '@app/common';
import { useAppDispatch, useAppSelector, setTrack } from '@app/common/store';

import type { PlaylistProps } from './playlist.interface';
import styles from './playlist.module.css';

export const Playlist: FC<PlaylistProps> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();

  const { currentPlaylist } = useAppSelector((store) => store.albumSlice);

  return currentPlaylist ? (
    <div {...props} className={classNames(styles.playlist__wrapper, className)}>
      <div className={styles.playlist}>
        <img
          src={currentPlaylist.photo}
          alt={currentPlaylist.title}
          className={styles.playlist__photo}
        />
        <div className={styles.playlist__info}>
          <h2 className={styles.playlist__title}>{currentPlaylist.title}</h2>
          {/* TODO: replace to real author */}
          <p className={styles.playlist__author}>Worldspawn</p>
          <p className={styles.playlist__count}>
            {`${currentPlaylist.music_list.length} tracks`}
          </p>
          {/* TODO: replace to real description */}
          <p className={styles.playlist__description}>
            This is description of playlist
          </p>
        </div>
      </div>
      <div className={styles.playlist__list}>
        {currentPlaylist.music_list.map((track) => (
          <Track
            key={track.id}
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
