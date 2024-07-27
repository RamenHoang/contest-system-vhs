import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';
import { ICheckTestAttempts } from '~/types';

export const useCheckTestAttempts = () => {
  const { id } = useParams();
  let callback: CallableFunction | null = null;

  return useMutation({
    mutationFn: (variables: ICheckTestAttempts) => {
      const participant = variables.participant;
      callback = variables.callback;
      return CompetitionApi.checkTestAttempts(Number(id), participant);
    },
    onSuccess: (data) => {
      console.log(data);
      if (callback) {
        if (data.data.isAttempt) {
          callback();
        } else {
          message.error('Bạn đã hết số lần thi!');
        }
      }
    }
  });
};
