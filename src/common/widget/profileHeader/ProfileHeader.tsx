import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  IconButton,
  OptionsIcon,
  useNotification,
  useAuth,
  NotificationAction,
} from '@app/common';

import type { ProfileHeaderProps } from './profileHeader.interface';
import styles from './profileHeader.module.css';

export const ProfileHeader = ({
  user,
  className,
  ...props
}: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const { callNotification } = useNotification();
  const { clearUser } = useAuth();

  const onLogout = () => {
    clearUser();
    navigate('/');
  };

  return (
    <div {...props} className={classNames(styles.profile__info, className)}>
      <img
        src="https://images.unsplash.com/photo-1621109246687-10ae613f2d8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        alt="avatar"
        className={styles.info__photo}
      />
      <div className={styles.info__user}>
        <h2 className={styles.user__name}>{user.username}</h2>
        <p className={styles.user__sex}>he/him, 23 years old</p>
        <section className={styles.separator} />
        <p className={styles.user__status}>What about you? Lorem ipsum</p>
        <IconButton className={styles.user__options} icon={<OptionsIcon />} />
      </div>
      <div className={styles['track-info']}>
        <p className={styles['track-info__title']}>This buddy has</p>
        <p className={styles['track-info__likes']}>
          {`${user.playlist[0].music_list.length} likes`}
        </p>
        <p className={styles['track-info__playlists']}>
          {`${user.playlist.length} playlists`}
        </p>
        <Button
          variant="outlined"
          className={styles['track-info__button']}
          onClick={() => {
            callNotification({
              type: 'action',
              content: <NotificationAction onSuccess={onLogout} />,
            });
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
