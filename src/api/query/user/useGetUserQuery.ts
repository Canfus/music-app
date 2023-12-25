import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { User, AxiosError, axiosInstance } from '@app/api';

export const useGetUserQuery = (
  id: number,
  options?: UseSuspenseQueryOptions<User, AxiosError>,
) => {
  const queryInfo = useSuspenseQuery<User, AxiosError>({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/users/${id}`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
  return queryInfo;
};
