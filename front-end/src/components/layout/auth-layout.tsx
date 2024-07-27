import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { FullPageFallback } from '~/components/fallbacks';

export const AuthLayout = () => {
  return (
    <Suspense fallback={<FullPageFallback />}>
      <Outlet />
    </Suspense>
  );
};
