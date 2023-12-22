import { FC } from 'react';
import classNames from 'classnames';

import {
  NoPhotoIcon,
  IconButton,
  LikeIcon,
  DislikeIcon,
  copyToClipboard,
} from '@app/common';

import { TrackPreviewProps } from './trackPreview.interface';
import styles from './trackPreview.module.css';

export const TrackPreview: FC<TrackPreviewProps> = ({
  track,
  onLike,
  className,
  ...props
}) => (
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
      icon={track.favorite ? <DislikeIcon /> : <LikeIcon />}
    />
  </div>
);
