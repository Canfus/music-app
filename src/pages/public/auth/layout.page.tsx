import { Outlet, useMatch, Navigate } from 'react-router-dom';

import { Logo, LogoMobile, useUserAgent } from '@app/common';

import styles from './layout.module.css';

export const AuthLayout = () => {
  const [isMobile] = useUserAgent({ breakpoint: 768 });

  // this condition will return, we inside only auth route or inside of children routes
  // for example: http://localhost:3000/auth - this we inside only auth route
  // for example: http://localhost:3000/auth/login - this we inside of children routes
  const isInsideAuthPage = Boolean(useMatch('/auth/*')?.params['*']);

  // if we inside only auth route, navigate to login page by default
  // overwise skip this condition
  if (!isInsideAuthPage) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.layout__header}>
        {isMobile ? <LogoMobile /> : <Logo />}
      </div>
      <Outlet />
    </div>
  );
};
