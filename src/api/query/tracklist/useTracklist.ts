import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { axiosInstance } from '@app/api';
import type { Track, AxiosError } from '@app/api';

export const useTracklist = (
  queryOptions?: UseSuspenseQueryOptions<Track[], AxiosError>,
) => {
  const queryInfo = useSuspenseQuery<Track[], AxiosError>({
    queryKey: ['tracklist'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Track[]>('/track_list');
      return data;
    },
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  });
  return queryInfo;
};
