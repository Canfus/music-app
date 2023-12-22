import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

export const ErrorBoundaryFallback: FC<FallbackProps> = ({
  resetErrorBoundary,
  error,
}) => {
  const body = error.message ?? 'Что-то пошло не так!';

  return (
    <div>
      <p>{body}</p>
      <button type="button" onClick={resetErrorBoundary}>
        На главную
      </button>
    </div>
  );
};
