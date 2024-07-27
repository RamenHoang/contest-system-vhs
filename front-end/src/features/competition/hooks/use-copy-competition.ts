import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { CompetitionApi } from '~/api/competition-api';
import { useInvalidateCompetitions } from '~/features/home/hooks/use-competitions';

export const useCopyCompetition = () => {
  const invalidateCompetitions = useInvalidateCompetitions();

  return useMutation({
    mutationFn: (id: string) => CompetitionApi.copyCompetition(id as string),

    onSuccess: () => {
      invalidateCompetitions();
      message.success('Nhân cuộc thi thành công');
    },

    onError: (err) => {
      message.error(err.message);
    }
  });
};
