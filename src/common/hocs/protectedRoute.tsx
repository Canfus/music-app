import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@app/common';

export const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};
