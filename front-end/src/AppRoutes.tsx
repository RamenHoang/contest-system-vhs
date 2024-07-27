// AppRoutes.tsx
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import { NotFound } from './components/errors';
import { ProtectedRoute } from './features/auth/components';
import { MainLayout } from '~/components/layout/main-layout';
import { AuthLayout } from '~/components/layout/auth-layout';

const AuthRoutes = lazy(() => import('./features/auth'));
const HomeRoutes = lazy(() => import('./features/home'));
const CompetitionRoutes = lazy(() => import('./features/competition'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/*' element={<HomeRoutes />} />
      </Route>
      <Route path='/competition/*' element={<CompetitionRoutes />} />
      <Route element={<AuthLayout />}>
        <Route path='/auth/*' element={<AuthRoutes />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
