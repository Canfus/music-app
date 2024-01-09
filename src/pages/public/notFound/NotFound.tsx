import { Header } from '@app/common';
import styles from './notFound.module.css';

export const NotFound = () => (
  <div>
    <Header />
    <div className={styles.layout}>
      <h1 className={styles.header}>Whoops. Can&apos;t load the page.</h1>
      <h3 className={styles.sub_header}>Please, try again later.</h3>
      <img
        className={styles.layout__404__image}
        src="../src/assets/musicApp_cat_cry.png"
        alt="Page not found."
      />
    </div>
  </div>
);
