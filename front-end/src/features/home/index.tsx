import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import ImportExam from '~/features/quiz/pages/import-exam';

const HomePage = lazy(() => import('./pages/home-page'));
const ContestPage = lazy(() => import('./pages/manage-contest-page'));
const CreateContest = lazy(() => import('./pages/create-contest'));

const ExamPage = lazy(() => import('../quiz/pages/manage-exam-page'));
const CreateExam = lazy(() => import('../quiz/pages/create-exam'));
const ManageUnit = lazy(() => import('./pages/manage-unit-page'));

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard/contest' element={<ContestPage />} />
      <Route path='/dashboard/contest/:id/edit' element={<CreateContest />} />
      <Route path='/dashboard/quiz' element={<ExamPage />} />
      <Route path='/dashboard/quiz/:id/edit' element={<CreateExam />} />
      <Route path='/dashboard/quiz/import' element={<ImportExam />} />
      <Route path='/dashboard/unit' element={<ManageUnit />} />
      <Route path='*' element={<Navigate to='/not-found' />} />
    </Routes>
  );
};

export default HomeRoutes;
