import {
  useAppSelector,
  ProfileHeader,
  PlaylistThumb,
  Playlist,
} from '@app/common';

import styles from './profile.module.css';

export const ProfilePage = () => {
  const user = useAppSelector((store) => store.userSlice.user);

  if (!user) return null;

  return (
    <div className={styles.page__wrapper}>
      <div className={styles.page__profile}>
        <ProfileHeader user={user} />
        <div className={styles.page__playlists}>
          {user.playlist.map((playlist) => (
            <PlaylistThumb key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </div>
      <Playlist className={styles.playlist__selected} />
    </div>
  );
};
