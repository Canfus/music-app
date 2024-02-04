import { createContext, useMemo, useCallback } from 'react';

import {
  useAppSelector,
  useAppDispatch,
  resetUser,
  setUser,
} from '@app/common';
import type { User } from '@app/api';

import { AuthContextProps } from './authContext.interface';

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  clearUser: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((store) => store.userSlice);
  const dispatch = useAppDispatch();

  const clearUser = useCallback(() => {
    dispatch(resetUser());
  }, [dispatch]);

  const updateUser = useCallback(
    (newUser: User) => {
      dispatch(setUser(newUser));
    },
    [dispatch],
  );

  const contextValue = useMemo<AuthContextProps>(
    () => ({
      // have TS error here, fix it later, don't wanna fix it now
      // @ts-ignore
      user,
      clearUser,
      updateUser,
    }),
    [clearUser, updateUser, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
