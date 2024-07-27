import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';
import { ISetupCompetition } from '~/types';

export const useSetupCompetition = () => {
  const { id } = useParams();

  return useMutation({
    mutationFn: (data: ISetupCompetition) => CompetitionApi.setUpCompetition(data, id as string),

    onSuccess: () => {
      message.success('Bước 2 thành công');
    },

    onError: (err) => {
      message.error(err.message);
    }
  });
};
