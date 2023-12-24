import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { User, AxiosError, axiosInstance } from '@app/api';

export const useRegisterUserMutation = (
  options?: UseMutationOptions<User, AxiosError, string>,
) => {
  const mutationInfo = useMutation<User, AxiosError, string>({
    mutationFn: async (username) => {
      const { data } = await axiosInstance.post<User>('/register', {
        username,
      });
      return data;
    },
    ...options,
  });
  return mutationInfo;
};
