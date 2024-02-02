import classNames from 'classnames';
import { Link, useMatch } from 'react-router-dom';

import { useUserAgent, Logo, LogoMobile, ProfileIcon } from '@app/common';

import styles from './header.module.css';

export const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const [isMobile] = useUserAgent({ breakpoint: 768 });

  const isAuthPage = useMatch('/auth/*');

  return (
    <header {...props} className={classNames(styles.header, className)}>
      <Link to="/">{isMobile ? <LogoMobile /> : <Logo />}</Link>
      {!isAuthPage && (
        <Link to="/profile">
          <ProfileIcon />
        </Link>
      )}
    </header>
  );
};
