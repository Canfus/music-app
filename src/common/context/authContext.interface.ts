import { User } from '@app/api';

export interface AuthContextProps {
  user: User | null;
  clearUser: () => void;
  updateUser: (user: User) => void;
}
