import { forwardRef } from 'react';
import classNames from 'classnames';
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';

import type { SliderProps } from './slider.interface';
import styles from './slider.module.css';

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  ({ thumb = false, customThumb, className, ...props }, ref) => (
    <Root
      ref={ref}
      className={classNames(styles.slider__root, className)}
      {...props}
    >
      <Track className={styles.slider__track}>
        <Range className={styles.slider__range} />
      </Track>
      {thumb && customThumb ? (
        <Thumb className={styles['slider__thumb--custom']}>{customThumb}</Thumb>
      ) : (
        <Thumb
          className={classNames(styles.slider__thumb, {
            [styles['slider__thumb--disabled']]: !thumb,
          })}
        />
      )}
    </Root>
  ),
);
Slider.displayName = 'Slider';
