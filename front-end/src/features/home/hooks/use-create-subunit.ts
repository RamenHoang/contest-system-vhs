import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';
import { useInvalidateSubUnits } from '~/features/home/hooks/use-subunits';
import { ICreateSubUnits } from '~/types';

export const useCreateSubUnit = () => {
  const invalidateSubUnits = useInvalidateSubUnits();
  const { id } = useParams();

  return useMutation({
    mutationFn: (data: number[]) => CompetitionApi.addUnits(Number(id), data),

    onSuccess: () => {
      invalidateSubUnits();
      message.success('Thêm đơn vị thành công');
    },

    onError: (error) => {
      message.error(error.message);
    }
  });
};
