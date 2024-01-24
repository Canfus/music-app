import type { User } from '@app/api';

export interface ProfileHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}
