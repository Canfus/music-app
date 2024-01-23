import { FC, useMemo } from 'react';
import classNames from 'classnames';

import {
  NoPhotoIcon,
  IconButton,
  LikeIcon,
  copyToClipboard,
  setUser,
  useAppDispatch,
  useAuth,
} from '@app/common';
import { useDislikeTrackMutation, useLikeTrackMutation } from '@app/api';

import { TrackPreviewProps } from './trackPreview.interface';
import styles from './trackPreview.module.css';

export const TrackPreview: FC<TrackPreviewProps> = ({
  track,
  className,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const isFavorite = useMemo<boolean>(() => {
    if (!user || !track) {
      return false;
    }

    return user.playlist[0].music_list.some((trackId) => trackId === track._id);
  }, [track, user]);

  const { mutate: like } = useLikeTrackMutation({
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
  });
  const { mutate: dislike } = useDislikeTrackMutation({
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
  });

  const onLike: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (user) {
      if (!isFavorite) {
        like({ trackId: track._id, userId: user._id });
        return;
      }
      dislike({ trackId: track._id, userId: user._id });
    }
  };

  return (
    <div className={classNames(styles.preview__wrapper)} {...props}>
      <div className={styles.photo__wrapper}>
        {track?.photo ? (
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
        onClick={() => copyToClipboard(`${track?.author} - ${track?.name}`)}
        aria-hidden
      >
        <span className={styles.info__trackname}>{track?.name}</span>
        <span className={styles.info__author}>{track?.author}</span>
      </div>
      <IconButton
        onClick={onLike}
        style={
          isFavorite
            ? { color: 'var(--primary-color)' }
            : { color: 'var(--gray-color)' }
        }
        icon={<LikeIcon />}
      />
    </div>
  );
};
