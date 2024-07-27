import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { ExamApi } from '~/api/exam-api';
import { IExam } from '~/types';

export const useUpdateExam = () => {
  const { id } = useParams();

  return useMutation({
    mutationFn: (exam: Partial<IExam>) => ExamApi.updateExam(exam, id as string),

    onSuccess: () => {
      message.success('Cập nhật đề thi thành công');
    },

    onError: (err) => {
      message.error(err.message);
    }
  });
};
