import { Track } from './track';

export interface Playlist {
  id: number;
  title: string;
  photo: string;
  music_list: Track[];
}
