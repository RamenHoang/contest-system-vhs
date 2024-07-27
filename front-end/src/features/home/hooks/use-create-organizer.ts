import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { OrganizerApi } from '~/api/organizer-api';
import { IOrganizer } from '~/types';

export const useCreateOrganizer = () => {
  const { id } = useParams();

  return useMutation({
    mutationFn: (data: IOrganizer) => OrganizerApi.createOrganizer(data, id as string),

    onSuccess: () => {
      message.success('Thêm thông tin BTC thành công');
    },

    onError: (error) => {
      message.error(error.message);
    }
  });
};
