import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { ExamApi } from '~/api/exam-api';
import { IQuestion } from '~/types';

export const useCreateOrUpdateQuestion = () => {
  const { id } = useParams();

  return useMutation({
    mutationFn: async (questionData: Partial<IQuestion[]>) =>
      ExamApi.createOrUpdateQuestion({ questions: questionData }, id as string),
    onSuccess: () => {
      // message.success('Thành công');
    },

    onError: (err) => {
      message.error(err.message);
    }
  });
};
