import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { ExamApi } from '~/api/exam-api';
import { IExam } from '~/types';

export const useCreateExam = () => {
  return useMutation({
    mutationFn: async (examData: Partial<IExam>) => ExamApi.createExam(examData),

    onSuccess: () => {
      message.success('Create exam successfully');
    },

    onError: (err) => {
      message.error(err.message);
    }
  });
};
