import type { Playlist } from '@app/api';

interface User {
  id: number;
  username: string;
  playlist: Playlist[];
}

export interface UserSlice {
  user: User | null;
}
