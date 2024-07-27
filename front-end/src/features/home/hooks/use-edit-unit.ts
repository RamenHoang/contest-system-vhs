import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { UnitApi } from '~/api/unit-api';
import { IEditUnitData } from '~/types';

export const useEditUnit = () => {
  // const invalidateSubUnits = useInvalidateSubUnits();
  // const { id } = useParams();

  return useMutation({
    mutationFn: (data: IEditUnitData) => UnitApi.editUnit(data),

    onSuccess: () => {
      // invalidateSubUnits();
      message.success('Cập nhật đơn vị thành công');
    },

    onError: (error) => {
      message.error(error.message);
    }
  });
};
