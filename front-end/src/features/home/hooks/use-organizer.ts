import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { OrganizerApi } from '~/api/organizer-api';

export const useOrganizer = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ['organizer'],
    queryFn: () => OrganizerApi.getOrganizer(id as string)
  });
};
