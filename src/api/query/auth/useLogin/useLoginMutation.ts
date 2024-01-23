/* eslint-disable @typescript-eslint/indent */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '@app/api';
import type { User, Exception } from '@app/api';

import { UserCredentials } from './useLoginMutation.interface';

export const useLoginMutation = (
  options?: UseMutationOptions<
    User,
    AxiosError<Exception<UserCredentials>>,
    UserCredentials
  >,
) => {
  const mutationInfo = useMutation<
    User,
    AxiosError<Exception<UserCredentials>>,
    UserCredentials
  >({
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post<User>('/login', credentials);
      return data;
    },
    ...options,
  });
  return mutationInfo;
};
