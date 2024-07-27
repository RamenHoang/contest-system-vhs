import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';

export const useCompetition = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ['competition'],
    queryFn: () => CompetitionApi.getCompetitionById(id as string)
  });
};
