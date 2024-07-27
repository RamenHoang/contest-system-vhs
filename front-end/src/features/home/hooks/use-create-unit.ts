import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { UnitApi } from '~/api/unit-api';
import { ICreateUnitData } from '~/types';

export const useCreateUnit = () => {
  // const invalidateSubUnits = useInvalidateSubUnits();
  // const { id } = useParams();

  return useMutation({
    mutationFn: (data: ICreateUnitData) => UnitApi.createUnit(data),

    onSuccess: () => {
      // invalidateSubUnits();
      message.success('Thêm đơn vị thành công');
    },

    onError: (error) => {
      message.error(error.message);
    }
  });
};
