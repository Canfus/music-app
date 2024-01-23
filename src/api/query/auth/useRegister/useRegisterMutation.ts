/* eslint-disable @typescript-eslint/indent */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '@app/api';
import type { User, Exception } from '@app/api';

import { RegisterCredentials } from './useRegisterMutation.interface';

export const useRegisterMutation = (
  options?: UseMutationOptions<
    User,
    AxiosError<Exception<RegisterCredentials>>,
    RegisterCredentials
  >,
) => {
  const mutationInfo = useMutation<
    User,
    AxiosError<Exception<RegisterCredentials>>,
    RegisterCredentials
  >({
    mutationFn: async (userData) => {
      const { data } = await axiosInstance.post<User>('/register', userData);
      return data;
    },
    ...options,
  });
  return mutationInfo;
};
