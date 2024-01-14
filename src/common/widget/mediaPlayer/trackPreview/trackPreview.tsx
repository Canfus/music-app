import { FC } from 'react';
import classNames from 'classnames';

import {
  NoPhotoIcon,
  IconButton,
  LikeIcon,
  copyToClipboard,
} from '@app/common';

import { TrackPreviewProps } from './trackPreview.interface';
import styles from './trackPreview.module.css';

export const TrackPreview: FC<TrackPreviewProps> = ({
  track,
  className,
  ...props
}) => {
  const onLike = () => {
    // setFavorite((prev) => !prev);
  };

  return (
    <div className={classNames(styles.preview__wrapper)} {...props}>
      <div className={styles.photo__wrapper}>
        {track.photo ? (
          <img
            className={styles.preview__photo}
            src={track.photo}
            alt={track.photo}
          />
        ) : (
          <NoPhotoIcon />
        )}
      </div>
      <div
        className={styles.preview__info}
        onClick={() => copyToClipboard(`${track.author} - ${track.name}`)}
        aria-hidden
      >
        <span className={styles.info__trackname}>{track.name}</span>
        <span className={styles.info__author}>{track.author}</span>
      </div>
      <IconButton
        onClick={onLike}
        style={
          track.favorite
            ? { color: 'var(--primary-color)' }
            : { color: 'var(--gray-color)' }
        }
        icon={<LikeIcon />}
      />
    </div>
  );
};
