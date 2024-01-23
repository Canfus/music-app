import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '@app/api';
import type { Track } from '@app/api';

export const useTrackQuery = (
  trackId: string,
  options?: UseQueryOptions<Track, AxiosError>,
) => {
  const mutationInfo = useQuery<Track, AxiosError>({
    queryKey: ['track', trackId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Track>(`/tracklist/${trackId}`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: false,
    ...options,
  });

  return mutationInfo;
};
