import { useNavigate } from 'react-router-dom';
import { TableExam } from '~/features/quiz/components/table-exam';
import { useCreateExam } from '~/features/quiz/hooks/use-create-exam';
import { useInfo } from '~/hooks/useInfo';

const ManageExam = () => {
  const navigate = useNavigate();
  const { mutate: createExam } = useCreateExam();

  const { role } = useInfo();

  const handleCreateExam = () => {
    createExam(
      {
        title: 'Bài thi mới 1',
        totalMCQuestion: 0,
        totalEssayQuestion: 0
      },
      {
        onSuccess: (res) => {
          const id = res?.data;
          navigate(`/dashboard/quiz/${id}/edit`);
        }
      }
    );
  };

  return (
    <div className='mx-auto p-4 min-h-screen'>
      {role === 'admin' && (
        <div className='mb-4'>
          <div className='text-[#757575] uppercase text-[27px] leading-[34px] font-normal mb-4'>Kho đề thi </div>
          <div className='flex items-center gap-10'>
            <div onClick={handleCreateExam} className='cursor-pointer'>
              <div className='flex items-center justify-center rounded-xl p-3 w-[80px] h-[80px] bg-orange-500/90'>
                <img
                  src='https://myaloha.vn/image/dashboard/create_new_ic.png'
                  alt='createBtn'
                  className='h-[50px] hover:scale-[1.1] transition-all duration-300'
                />
              </div>
              <div className='mt-2'>Tạo mới</div>
            </div>
          </div>
        </div>
      )}
      <div className='mb-4'>
        <div className='text-[#757575] uppercase text-[27px] leading-[34px] font-normal mb-4'>Đề thi của bạn</div>
        <TableExam />
      </div>
    </div>
  );
};

export default ManageExam;
