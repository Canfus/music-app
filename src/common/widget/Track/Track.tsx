import classNames from 'classnames';
import { FC, useMemo } from 'react';

import {
  useTrackQuery,
  useLikeTrackMutation,
  useDislikeTrackMutation,
} from '@app/api';
import {
  IconButton,
  LikeIcon,
  PlayIcon,
  Loader,
  useAuth,
  setUser,
} from '@app/common';
import { useAppSelector, useAppDispatch, setTrack } from '@app/common/store';

import { TrackProps } from './track.interface';
import styles from './track.module.css';

export const Track: FC<TrackProps> = ({ track, className, ...props }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const isFavorite = useMemo<boolean>(() => {
    if (!user) {
      return false;
    }

    return user.playlist[0].music_list.some((trackId) => trackId === track._id);
  }, [track._id, user]);

  const { track: currentTrack } = useAppSelector(
    (store) => store.musicPlayerSlice,
  );

  const { refetch, isFetching: isLoading } = useTrackQuery(track._id);

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

  const onTrackSelect = () => {
    if (currentTrack?._id !== track._id) {
      refetch().then(({ data }) => {
        if (data) {
          dispatch(setTrack(data));
        }
      });
    }
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
      aria-hidden
      role="button"
      tabIndex={0}
      onClick={onTrackSelect}
      {...props}
    >
      <div className={styles.track}>
        <div className={styles.image__wrapper}>
          {isLoading && (
            <div className={styles.track__loader}>
              <Loader />
            </div>
          )}
          {!isLoading && (
            <IconButton icon={<PlayIcon />} className={styles.track__play} />
          )}
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
          isFavorite
            ? { color: 'var(--primary-color)' }
            : { color: 'var(--gray-color' }
        }
        icon={<LikeIcon />}
      />
    </div>
  );
};
