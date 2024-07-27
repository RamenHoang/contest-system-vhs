import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { ExamApi } from '~/api/exam-api';
import { useInvalidateExams } from '~/features/quiz/hooks/use-exams';

export const useDeleteExam = () => {
  const invalidateExams = useInvalidateExams();

  return useMutation({
    mutationFn: (id: string) => ExamApi.deleteExam(id as string),

    onSuccess: () => {
      invalidateExams();
      message.success('Xóa đề thi thành công');
    },

    onError: (err) => {
      message.error(err.message);
    }
  });
};
