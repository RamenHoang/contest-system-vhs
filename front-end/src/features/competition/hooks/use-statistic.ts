import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';

export const useStatistics = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ['statistics'],
    queryFn: () => CompetitionApi.getStatistics(id as string)
  });
};
