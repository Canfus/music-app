import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  Layout,
  MainPage,
  AuthLayout,
  Login,
  Register,
  NotFound,
  ProfilePage,
} from '@app/pages';
import { ProtectedRoute } from '@app/common';

import { routenames } from './routenames';

export const Router: FC = () => (
  <Routes>
    <Route path={routenames.HOME} element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={routenames.PROFILE} element={<ProfilePage />} />
      </Route>
    </Route>
    <Route path={routenames.AUTH} element={<AuthLayout />}>
      <Route path={routenames.LOGIN} element={<Login />} />
      <Route path={routenames.REGISTER} element={<Register />} />
    </Route>
    <Route path={routenames.NOT_FOUND} element={<NotFound />} />
  </Routes>
);
