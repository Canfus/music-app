import { Outlet } from 'react-router-dom';

import { Logo, LogoMobile, useUserAgent } from '@app/common';

import styles from './layout.module.css';

export const AuthLayout = () => {
  const [isMobile] = useUserAgent({ breakpoint: 768 });

  return (
    <div className={styles.layout}>
      <div className={styles.layout__header}>
        {isMobile ? <LogoMobile /> : <Logo />}
      </div>
      <Outlet />
    </div>
  );
};
