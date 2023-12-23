import { Track } from '@app/api';

export interface TrackPreviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  track: Track;
}
