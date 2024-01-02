import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { User, AxiosError, axiosInstance } from '@app/api';

import { RegisterCredentials } from './useRegisterMutation.interface';

export const useRegisterMutation = (
  options?: UseMutationOptions<User, AxiosError, RegisterCredentials>,
) => {
  const mutationInfo = useMutation<User, AxiosError, RegisterCredentials>({
    mutationFn: async (userData) => {
      const { data } = await axiosInstance.post<User>('/register', {
        userData,
      });
      return data;
    },
    ...options,
  });
  return mutationInfo;
};
