import classNames from 'classnames';
import { FC, MouseEventHandler } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { IconButton, LikeIcon, PlayIcon } from '@app/common';
import { useAppSelector } from '@app/common/store';
import { useLikeMutation, useDislikeMutation } from '@app/api';

import { TrackProps } from './track.interface';
import styles from './track.module.css';

export const Track: FC<TrackProps> = ({ track, className, ...props }) => {
  const queryClient = useQueryClient();

  const { track: currentTrack } = useAppSelector(
    (store) => store.musicPlayerSlice,
  );
  const { user } = useAppSelector((store) => store.userSlice);

  const { mutate: like } = useLikeMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracklist'] });
    },
  });
  const { mutate: dislike } = useDislikeMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracklist'] });
    },
  });

  if (!user) return null;

  const onLike: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    if (track.favorite) {
      dislike({ user_id: user.id, track_id: track.id });
      return;
    }
    like({ user_id: user.id, track_id: track.id });
  };

  return (
    <div
      className={classNames(
        styles.track__wrapper,
        {
          [styles['track--selected']]: currentTrack?.id === track.id,
        },
        className,
      )}
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
          track.favorite
            ? { color: 'var(--primary-color)' }
            : { color: 'var(--gray-color' }
        }
        icon={<LikeIcon />}
      />
    </div>
  );
};
