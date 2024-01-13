import { useNavigate } from 'react-router-dom';

import { Header, Cat404, Button } from '@app/common';

import styles from './notFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();

  const onNavigateClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <Header className={styles.page__header} />
      <div className={styles.page__content}>
        <h1 className={styles.content__title}>Whoops. Page not found</h1>
        <Cat404 />
        <Button variant="secondary" onClick={onNavigateClick}>
          Go to main
        </Button>
      </div>
    </div>
  );
};
