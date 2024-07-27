import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { CompetitionApi } from '~/api/competition-api';
import { useInvalidateCompetitions } from '~/features/home/hooks/use-competitions';

export const useDeleteCompetition = () => {
  const invalidateCompetitions = useInvalidateCompetitions();

  return useMutation({
    mutationFn: (id: string) => CompetitionApi.deleteCompetition(id as string),

    onSuccess: () => {
      invalidateCompetitions();
      message.success('Xóa cuộc thi thành công');
    },

    onError: (err) => {
      message.error(err.message);
    }
  });
};
