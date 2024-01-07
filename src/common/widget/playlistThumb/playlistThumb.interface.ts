import { Playlist } from '@app/api';

export interface PlaylistThumbProps
  extends React.HTMLAttributes<HTMLDivElement> {
  playlist: Playlist;
}
