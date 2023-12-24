import type { Playlist } from '@app/api';

export interface PlaylistProps extends React.HTMLAttributes<HTMLDivElement> {
  playlist: Playlist;
}
