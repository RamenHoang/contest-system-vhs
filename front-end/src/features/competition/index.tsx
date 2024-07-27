import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const IntroPage = lazy(() => import('../competition/pages/intro-page'));
const ActualMC = lazy(() => import('../competition/pages/actual-mc'));

const CompetitionRoutes = () => {
  return (
    <Routes>
      <Route path='/cuoc-thi/intro/:id/:slug/*' element={<IntroPage />} />
      <Route path='/cuoc-thi/start/:id/:slug/*' element={<ActualMC />} />
      <Route path='*' element={<Navigate to='/not-found' />} />
    </Routes>
  );
};

export default CompetitionRoutes;
