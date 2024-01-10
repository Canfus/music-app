import { Link } from 'react-router-dom';

import { Header } from '@app/common';
import { Cat404 } from '@app/common/icons/cat404';

import styles from '../auth/layout.module.css';

export const NotFound = () => (
  <div>
    <Header />
    <div className={styles.layout}>
      <div className={styles.page404}>
        <h1 className={styles.page404__label}>Whoops. Page not found.</h1>
        <h3 className={styles.page404__sub_label}>
          Pet the &quot;Music Cat&quot; to return.
        </h3>
        <Link to="/">
          <Cat404 />
        </Link>
      </div>
    </div>
  </div>
);
