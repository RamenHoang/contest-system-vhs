import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { queryClient } from '~/api/query-client';
import { UnitApi } from '~/api/unit-api';

export const useSubUnits = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ['sub-units', id],
    queryFn: () => UnitApi.getListSubUnit(id as string)
  });
};

export const useUnits = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: () => UnitApi.getUnits()
  });
};

export const useInvalidateSubUnits = () => {
  const { id } = useParams();
  return () => {
    return queryClient.invalidateQueries({
      type: 'all',
      queryKey: ['sub-units', id]
    });
  };
};
