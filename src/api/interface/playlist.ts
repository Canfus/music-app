import { Track } from './track';

export interface Playlist {
  _id: string;
  title: string;
  description: string;
  author: string;
  photo: string;
  music_list: Track[];
}
