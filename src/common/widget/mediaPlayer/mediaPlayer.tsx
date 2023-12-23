import { FC, useState } from 'react';
import classNames from 'classnames';

import {
  Slider,
  IconButton,
  BackIcon,
  NextIcon,
  PlayIcon,
  PauseIcon,
} from '@app/common';
import { useAppSelector } from '@app/common/store';

import { Volume } from '@app/common/widget/mediaPlayer/volume';
import { TrackPreview } from './trackPreview';
import type { MediaPlayerProps } from './mediaPlayer.interface';
import styles from './mediaPlayer.module.css';

export const MediaPlayer: FC<MediaPlayerProps> = ({ className, ...props }) => {
  const { trackList } = useAppSelector((store) => store.albumSlice);

  const [trackState, setTrackState] = useState<boolean>(false);
  const [playerState, setPlayerState] = useState<number[]>([0]);
  const [volume, setVolume] = useState<number[]>([0]);

  return (
    <div className={classNames(styles.player__wrapper, className)} {...props}>
      <Slider value={playerState} onValueChange={setPlayerState} />
      <div className={styles.player__controls}>
        <div className={styles.controls__wrapper}>
          <div className={styles['controls__music-control']}>
            <IconButton
              disabled
              className={styles.button__control}
              icon={<BackIcon />}
            />
            <IconButton
              onClick={() => setTrackState((prev) => !prev)}
              className={styles.button__control}
              icon={trackState ? <PauseIcon /> : <PlayIcon />}
            />
            <IconButton
              className={styles.button__control}
              icon={<NextIcon />}
            />
          </div>
          <TrackPreview track={trackList[0]} />
        </div>
        <Volume volume={volume} onVolumeChange={setVolume} />
      </div>
    </div>
  );
};
