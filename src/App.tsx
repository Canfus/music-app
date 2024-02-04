import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';

import { Router } from '@app/router';
import {
  ErrorBoundaryFallback,
  SuspenseFallback,
  AuthProvider,
  Notification,
} from '@app/common';

export const App = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorBoundaryFallback}>
        <TooltipProvider>
          <AuthProvider>
            <Router />
            <Notification />
          </AuthProvider>
        </TooltipProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
