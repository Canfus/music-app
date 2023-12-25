import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { axiosInstance } from '@app/api';
import type { Playlist, AxiosError } from '@app/api';

export const useCurrentPlaylistQuery = (
  playlistId: number,
  queryOptions?: UseSuspenseQueryOptions<Playlist, AxiosError>,
) => {
  const queryInfo = useSuspenseQuery<Playlist, AxiosError>({
    queryKey: ['tracklist', playlistId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Playlist>(
        `/playlists/${playlistId}`,
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  });
  return queryInfo;
};
