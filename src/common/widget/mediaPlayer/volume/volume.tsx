import { FC } from 'react';
import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-tooltip';

import { VolumeMaxIcon, VolumeOffIcon, Slider, IconButton } from '@app/common';

import type { VolumeProps } from './volume.interface';
import styles from './volume.module.css';

export const Volume: FC<VolumeProps> = ({
  volume,
  onVolumeChange,
  className,
  ...props
}) => (
  <Root delayDuration={100} {...props}>
    <Trigger asChild>
      <IconButton
        icon={volume[0] > 0 ? <VolumeMaxIcon /> : <VolumeOffIcon />}
      />
    </Trigger>
    <Portal>
      <Content className={styles.volume__content} side="left">
        <Slider
          className={styles.volume__slider}
          value={volume}
          onValueChange={onVolumeChange}
        />
        <Arrow className={styles.volume__arrow} />
      </Content>
    </Portal>
  </Root>
);
