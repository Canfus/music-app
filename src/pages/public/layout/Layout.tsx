import { Outlet } from 'react-router-dom';

import { Header, MediaPlayer, Notification } from '@app/common';

import styles from './layout.module.css';

export const Layout = () => (
  <div className={styles.layout__wrapper}>
    <Header />
    <div className={styles.layout__outlet}>
      <Outlet />
    </div>
    <MediaPlayer className={styles.media__player} />
    <Notification />
  </div>
);
