import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AntModal from '~/components/ui/modal';

const StepTwo = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  return (
    <>
      <div className='flex justify-center items-center mt-32 gap-20'>
        <div className='p-2 shadow-lg rounded-2xl w-full max-w max-w-[14rem]'>
          <div
            className='min-h-[225px] flex items-center justify-center p-4 text-center cursor-pointer'
            onClick={() => navigate('/dashboard/quiz/')}
          >
            <div>
              <img
                src='https://myaloha.vn/upload/images/edit_manually.png'
                alt='Từ kho đề thi'
                className='w-full h-auto'
              />
              <div className='mt-4'>Soạn đề mới</div>
            </div>
          </div>
        </div>
        <div className='p-2 shadow-lg rounded-2xl w-full max-w max-w-[14rem]'>
          <div className='min-h-[225px] flex items-center justify-center p-4 text-center'>
            <div>
              <img src='https://myaloha.vn/upload/images/from_repo.png' alt='Từ kho đề thi' className='w-full h-auto' />
              <div className='mt-4'>Chọn từ kho đề thi phía bên phải </div>
            </div>
          </div>
        </div>
      </div>
      <AntModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default StepTwo;
