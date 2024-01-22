import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '@app/api';
import type { Playlist } from '@app/api';

export const usePlaylistMutation = (
  options?: UseMutationOptions<Playlist, AxiosError, string>,
) => {
  const queryInfo = useMutation<Playlist, AxiosError, string>({
    mutationFn: async (playlistId) => {
      const { data } = await axiosInstance.get<Playlist>(
        `/playlists/${playlistId}`,
      );
      return data;
    },
    ...options,
  });

  return queryInfo;
};
