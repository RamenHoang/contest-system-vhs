import { Modal } from 'antd';
import ExamItem from '~/features/home/components/list-exam';
import { useExams } from '~/features/quiz/hooks/use-exams';
import { IExam } from '~/types';

const AntModal = ({
  isModalOpen,
  setIsModalOpen
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const { data: examsData } = useExams();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        width={650}
        title='Danh sách đề thi (Tối đa: 2 đề thi)'
        open={isModalOpen}
        onOk={handleOk}
        okText='Lưu'
        okButtonProps={{
          style: { background: '#dd3b3b', padding: '18px 32px' }
        }}
        cancelText='Hủy'
        cancelButtonProps={{
          style: { padding: '18px 32px' }
        }}
        onCancel={handleCancel}
        style={{ maxHeight: '700px', overflow: 'auto', borderRadius: '12px' }}
      >
        <ul>
          {examsData?.data?.map((exam: IExam) => (
            <ExamItem
              key={exam.id}
              title={exam.title}
              totalEssayQuestion={exam.totalEssayQuestion}
              totalMCQuestion={exam.totalMCQuestion}
            />
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default AntModal;
