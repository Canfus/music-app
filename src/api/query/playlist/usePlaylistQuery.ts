import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '@app/api';
import type { Playlist } from '@app/api';

export const usePlaylistQuery = (
  playlistId: string,
  options?: UseQueryOptions<Playlist, AxiosError>,
) => {
  const queryInfo = useQuery<Playlist, AxiosError>({
    queryKey: ['playlist', playlistId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Playlist>(
        `/playlists/${playlistId}`,
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: false,
    ...options,
  });

  return queryInfo;
};
