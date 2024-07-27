import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ExamApi } from '~/api/exam-api';

export const useExam = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: ['exam'],
    queryFn: async () => ExamApi.getExam(id as string)
  });
};
