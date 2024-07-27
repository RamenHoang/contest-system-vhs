import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { UnitApi } from '~/api/unit-api';

export const useDeleteUnit = () => {
  // const invalidateSubUnits = useInvalidateSubUnits();
  // const { id } = useParams();

  return useMutation({
    mutationFn: (id: number) => UnitApi.deleteUnit(id),

    onSuccess: () => {
      // invalidateSubUnits();
      message.success('Xóa đơn vị thành công');
    },

    onError: (error) => {
      message.error(error.message);
    }
  });
};
