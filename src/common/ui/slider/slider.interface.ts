import type { SliderProps as SliderPrimitiveProps } from '@radix-ui/react-slider';

export interface SliderProps extends SliderPrimitiveProps {
  thumb?: boolean;
  customThumb?: React.ReactNode;
}
