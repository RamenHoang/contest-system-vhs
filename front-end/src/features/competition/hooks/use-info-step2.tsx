import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';

export const useInfoStep2 = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ['infoStep2'],
    queryFn: () => CompetitionApi.getInfoStep2(id as string)
  });
};
