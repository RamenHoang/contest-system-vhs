import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { CompetitionApi } from '~/api/competition-api';

export const useDeleteCompetitionUnit = () => {
  const { id } = useParams();

  return useMutation({
    mutationFn: (unitId: number) => CompetitionApi.deleteUnit(Number(id), unitId),

    onSuccess: () => {
      message.success('Xóa đơn vị khỏi cuộc thi thành công');
    },

    onError: () => {
      message.error('Xóa đơn vị khỏi cuộc thi  thất bại');
    }
  });
};
