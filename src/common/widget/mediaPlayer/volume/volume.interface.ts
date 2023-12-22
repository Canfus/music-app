import type { TooltipProps } from '@radix-ui/react-tooltip';

export interface VolumeProps extends TooltipProps {
  volume: number[];
  onVolumeChange: (volume: number[]) => void;
  className?: string;
}
