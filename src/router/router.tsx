import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout, MainPage, AuthLayout, Login } from '@app/pages';
import { ProtectedRoute } from '@app/common';

import { routenames } from './routenames';

export const Router: FC = () => (
  <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path={routenames.HOME} element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Route>
    <Route path={routenames.AUTH} element={<AuthLayout />}>
      <Route path={routenames.LOGIN} element={<Login />} />
    </Route>
  </Routes>
);
