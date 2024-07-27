import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { ExamApi } from '~/api/exam-api';
import { queryClient } from '~/api/query-client';

export const useDeleteQuestion = () => {
  return useMutation({
    mutationFn: (id: string) => ExamApi.deleteQuestion(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['exam']
      });
      message.success('Xóa câu hỏi thành công');
    },
    onError: (err) => {
      message.error(err.message);
    }
  });
};
