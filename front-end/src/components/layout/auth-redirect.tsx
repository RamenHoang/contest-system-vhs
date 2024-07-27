// AuthRedirect.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '~/hooks/useLogin';

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useLogin();
  if (isLoggedIn) return <Navigate to='/' replace={true} />;

  return children;
};

export default AuthRedirect;
