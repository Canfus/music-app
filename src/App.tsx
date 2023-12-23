import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Provider } from '@radix-ui/react-tooltip';

import { Router } from '@app/router';
import { ErrorBoundaryFallback, SuspenseFallback } from '@app/common';

import './App.css';

export const App = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorBoundaryFallback}>
        <Provider>
          <Router />
        </Provider>
      </ErrorBoundary>
    </Suspense>
  );
};
