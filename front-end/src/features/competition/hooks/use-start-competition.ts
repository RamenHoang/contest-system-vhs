import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';

export const useStartCompetition = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ['start-competition'],
    queryFn: async () => CompetitionApi.startCompetition(id as string)
  });
};
