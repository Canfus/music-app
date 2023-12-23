import { Loader } from '@app/common';

import styles from './suspense.module.css';

export const SuspenseFallback = () => (
  <div className={styles.fallback__wrapper}>
    <Loader />
  </div>
);
