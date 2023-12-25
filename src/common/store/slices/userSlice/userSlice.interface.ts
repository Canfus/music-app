interface User {
  id: number | null;
  username: string | null;
  playlist: any[]; // TODO: replace this to real type
}

export interface UserSlice {
  user: User | null;
}
