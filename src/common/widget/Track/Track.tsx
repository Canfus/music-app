import classNames from 'classnames';
import { FC, useState, MouseEventHandler } from 'react';

import { IconButton, LikeIcon } from '@app/common';

import { TrackProps } from './track.interface';
import styles from './track.module.css';

export const Track: FC<TrackProps> = ({ track, className, ...props }) => {
  const [favorite, setFavorite] = useState(track.favorite);

  const onLike: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setFavorite((prev) => !prev);
  };

  return (
    <div className={classNames(styles.track__wrapper, className)} {...props}>
      <div className={styles.track}>
        <img
          className={styles.track__image}
          src={track.photo}
          alt={`${track.author} - ${track.name}`}
        />
        <div className={styles.track__info}>
          <span className={styles.info__trackname}>{track?.name}</span>
          <span className={styles.info__author}>{track?.author}</span>
        </div>
      </div>
      <IconButton
        onClick={onLike}
        style={favorite ? { color: 'var(--primary-color)' } : {}}
        icon={<LikeIcon />}
      />
    </div>
  );
};
