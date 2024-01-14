import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '@app/api';

import { Credentials } from './useDislikeMutation.interface';

export const useDislikeMutation = (
  options?: UseMutationOptions<unknown, AxiosError, Credentials>,
) => {
  const mutationInfo = useMutation<unknown, AxiosError, Credentials>({
    mutationFn: async ({ track_id, user_id }) => {
      const { data } = await axiosInstance.post<unknown>('/dislike', {
        track_id,
        user_id,
      });
      return data;
    },
    ...options,
  });
  return mutationInfo;
};
