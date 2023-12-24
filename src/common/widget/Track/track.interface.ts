import { Track } from '@app/api';

export interface TrackProps extends React.HTMLAttributes<HTMLDivElement> {
  track: Track;
}
