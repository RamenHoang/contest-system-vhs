import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const ExamPage = lazy(() => import('./pages/manage-exam-page'));
const CreateExam = lazy(() => import('./pages/create-exam'));
const EditExam = lazy(() => import('./pages/edit-exam'));

const QuizRoutes = () => {
  return (
    <Routes>
      <Route path='/dashboard/quiz' element={<ExamPage />} />
      <Route path='/dashboard/quiz/create' element={<CreateExam />} />
      {/* <Route path='/dashboard/quiz/edit' element={<EditExam />} /> */}
      <Route path='/dashboard/quiz/edit/:id' element={<EditExam />} />

      <Route path='*' element={<Navigate to='/not-found' />} />
    </Routes>
  );
};

export default QuizRoutes;
