import type { PropsWithChildren } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useLogin } from '~/hooks/useLogin';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  // const isLoggedIn = useLogin();
  // if (isLoggedIn) return <Navigate to='/' replace={true} />;

  return children;
};
