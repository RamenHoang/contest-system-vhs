import { useQuery } from '@tanstack/react-query';
import { CompetitionApi } from '~/api/competition-api';

export const useGetInfoRequired = () => {
  return useQuery({
    queryKey: ['info-required'],
    queryFn: () => CompetitionApi.getListInfoRequired()
  });
};
