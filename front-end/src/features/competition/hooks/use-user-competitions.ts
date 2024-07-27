import { useQuery } from '@tanstack/react-query';
import { CompetitionApi } from '~/api/competition-api';

export const useUserCompetitions = () => {
  return useQuery({
    queryKey: ['user-competitions'],
    queryFn: () => CompetitionApi.getCompetitionsByUser()
  });
};
