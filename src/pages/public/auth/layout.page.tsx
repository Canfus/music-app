import { Outlet, useMatch, Navigate } from 'react-router-dom';

import { Header } from '@app/common';

import styles from './layout.module.css';

export const AuthLayout = () => {
  // this condition will return, we inside only auth route or inside of children routes
  // for example: http://localhost:3000/auth - this we inside only auth route
  // for example: http://localhost:3000/auth/login - this we inside of children routes
  const isAuthPage = useMatch('/auth/*');

  // if we inside only auth route, navigate to login page by default
  // overwise skip this condition
  if (!isAuthPage?.params['*']) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className={styles.layout}>
      <Header className={styles.layout__header} />
      <Outlet />
    </div>
  );
};
