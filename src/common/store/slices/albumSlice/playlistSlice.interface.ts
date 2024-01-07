import type { Playlist } from '@app/api';

export interface AlbumSlice {
  playlist: Playlist[];
  currentPlaylist: Playlist | null;
}
