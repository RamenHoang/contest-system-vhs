import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';

export const useListAvailableCompetitionUnits = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ['list-available-competition-units'],
    queryFn: () => CompetitionApi.getAvailableUnits(Number(id))
  });
};
