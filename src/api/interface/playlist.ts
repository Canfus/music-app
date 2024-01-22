import { Track } from './track';

export interface Playlist {
  _id: number;
  title: string;
  author: string;
  photo: string;
  music_list: Track[];
}
