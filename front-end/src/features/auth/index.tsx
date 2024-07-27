import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const SignIn = lazy(() => import('./pages/sign-in'));
const SignUp = lazy(() => import('./pages/sign-up'));

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='*' element={<Navigate to='/not-found' />} />
    </Routes>
  );
};

export default AuthRoutes;
