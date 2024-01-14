import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '@app/api';

import { Credentials } from './useLikeMutation.interface';

export const useLikeMutation = (
  options?: UseMutationOptions<unknown, AxiosError, Credentials>,
) => {
  const mutationInfo = useMutation<unknown, AxiosError, Credentials>({
    mutationFn: async ({ track_id, user_id }) => {
      const { data } = await axiosInstance.post<unknown>('/like', {
        track_id,
        user_id,
      });
      return data;
    },
    ...options,
  });
  return mutationInfo;
};
