import { Playlist } from '@app/api';

export interface User {
  _id: string;
  username: string;
  playlist: Playlist[];
}
