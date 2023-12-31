import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout, MainPage, AuthLayout, Login } from '@app/pages';

import { routenames } from './routenames';

export const Router: FC = () => (
  <Routes>
    <Route path={routenames.HOME} element={<Layout />}>
      <Route index element={<MainPage />} />
    </Route>
    <Route path={routenames.AUTH} element={<AuthLayout />}>
      <Route path={routenames.LOGIN} element={<Login />} />
    </Route>
  </Routes>
);
