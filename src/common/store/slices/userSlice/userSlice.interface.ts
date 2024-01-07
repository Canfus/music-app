import type { Playlist } from '@app/api';

interface User {
  id: number | null;
  username: string | null;
  playlist: Playlist[];
}

export interface UserSlice {
  user: User | null;
}
