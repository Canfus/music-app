import classNames from 'classnames';
import { FC, useState, MouseEventHandler } from 'react';

import { IconButton, LikeIcon, PlayIcon } from '@app/common';
import { useAppSelector } from '@app/common/store';

import { TrackProps } from './track.interface';
import styles from './track.module.css';

export const Track: FC<TrackProps> = ({ track, className, ...props }) => {
  const [favorite, setFavorite] = useState(false);

  const { track: currentTrack } = useAppSelector(
    (store) => store.musicPlayerSlice,
  );

  const onLike: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setFavorite((prev) => !prev);
  };

  return (
    <div
      className={classNames(
        styles.track__wrapper,
        {
          [styles['track--selected']]: currentTrack?._id === track._id,
        },
        className,
      )}
      aria-label="Select track"
      {...props}
    >
      <div className={styles.track}>
        <div className={styles.image__wrapper}>
          <IconButton icon={<PlayIcon />} className={styles.track__play} />
          <img
            className={styles.track__image}
            src={track.photo}
            alt={`${track.author} - ${track.name}`}
          />
        </div>
        <div className={styles.track__info}>
          <span className={styles.info__trackname}>{track?.name}</span>
          <span className={styles.info__author}>{track?.author}</span>
        </div>
      </div>
      <IconButton
        onClick={onLike}
        style={
          favorite
            ? { color: 'var(--primary-color)' }
            : { color: 'var(--gray-color' }
        }
        icon={<LikeIcon />}
      />
    </div>
  );
};
