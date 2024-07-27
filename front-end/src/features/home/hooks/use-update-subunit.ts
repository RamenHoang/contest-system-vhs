import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { UnitApi } from '~/api/unit-api';
import { useInvalidateSubUnits } from '~/features/home/hooks/use-subunits';

export const useUpdateSubUnit = () => {
  const invalidateSubUnits = useInvalidateSubUnits();

  return useMutation({
    mutationFn: ({ name, id }: { name: string; id: string }) => UnitApi.updateSubUnits({ name }, id),

    onSuccess: () => {
      invalidateSubUnits();
      message.success('Cập nhật đơn vị thành công');
    },

    onError: () => {
      message.error('Cập nhật đơn vị thất bại');
    }
  });
};
