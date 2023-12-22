import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from '@app/pages';

import { routenames } from './routenames';

export const Router: FC = () => (
  <Routes>
    <Route path={routenames.HOME} element={<Layout />}>
      <Route index element={<div>Eto main</div>} />
    </Route>
  </Routes>
);
