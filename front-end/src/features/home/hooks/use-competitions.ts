import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';
import { queryClient } from '~/api/query-client';

export const useCompetitions = () => {
  return useQuery({
    queryKey: ['competitions'],
    queryFn: () => CompetitionApi.getListCompetition()
  });
};

export const useInvalidateCompetitions = () => {
  const { id } = useParams();
  return () => {
    return queryClient.invalidateQueries({
      type: 'all',
      queryKey: ['competitions', id]
    });
  };
};
