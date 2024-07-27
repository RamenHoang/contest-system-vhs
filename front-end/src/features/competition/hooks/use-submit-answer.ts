import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';
import { ISubmitAnswer } from '~/types';

export const useSubmitAnswer = () => {
  const { id } = useParams();

  return useMutation({
    mutationFn: async (data: ISubmitAnswer) => CompetitionApi.submitAnswer(data, id as string),

    onSuccess: () => {
      message.success('Bạn đã hoàn thành bài thi');
    },

    onError: (err) => {
      message.error(err.message);
    }
  });
};
