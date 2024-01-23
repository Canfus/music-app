import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '@app/api';
import type { User } from '@app/api';

import { FavoriteCredentials } from './useTrackMutation.interface';

export const useLikeTrackMutation = (
  options?: UseMutationOptions<User, AxiosError, FavoriteCredentials>,
) => {
  const mutationInfo = useMutation<User, AxiosError, FavoriteCredentials>({
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post<User>('/like', credentials);
      return data;
    },
    ...options,
  });
  return mutationInfo;
};
