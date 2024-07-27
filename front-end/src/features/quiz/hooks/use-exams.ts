import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ExamApi } from '~/api/exam-api';
import { queryClient } from '~/api/query-client';

export const useExams = () => {
  return useQuery({
    queryKey: ['exams'],
    queryFn: () => ExamApi.getExams()
  });
};

export const useInvalidateExams = () => {
  const { id } = useParams();
  return () => {
    return queryClient.invalidateQueries({
      type: 'all',
      queryKey: ['exams', id]
    });
  };
};
