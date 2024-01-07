/* eslint-disable no-confusing-arrow, implicit-arrow-linebreak */
import { FC } from 'react';
import classNames from 'classnames';

import { Track } from '@app/common';

import type { PlaylistProps } from './playlist.interface';
import styles from './playlist.module.css';

export const Playlist: FC<PlaylistProps> = ({
  playlist,
  className,
  ...props
}) =>
  playlist ? (
    <div {...props} className={classNames(styles.playlist__wrapper, className)}>
      <div className={styles.playlist}>
        <img
          src={playlist.photo}
          alt={playlist.title}
          className={styles.playlist__photo}
        />
        <div className={styles.playlist__info}>
          <h2 className={styles.playlist__title}>{playlist.title}</h2>
          {/* TODO: replace to real author */}
          <p className={styles.playlist__author}>Worldspawn</p>
          <p className={styles.playlist__count}>
            {`${playlist.music_list.length} tracks`}
          </p>
          {/* TODO: replace to real description */}
          <p className={styles.playlist__description}>
            This is description of playlist
          </p>
        </div>
      </div>
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
  ) : (
    // <div className={classNames(styles.playlist__wrapper, className)} {...props}>
    // <h2 className={styles.playlist__title}>{playlist.title}</h2>
    // <div className={styles.playlist__list}>
    // {playlist.music_list.map((track) => (
    //       <Track
    //         key={track.id}
    //         onClick={() => console.log(track.id)}
    //         className={styles.track}
    //         track={track}
    //       />
    //     ))}
    //   </div>
    // </div>
    <div
      {...props}
      className={classNames(styles['playlist__wrapper--empty'], className)}
    >
      Select your best playlist
    </div>
  );
