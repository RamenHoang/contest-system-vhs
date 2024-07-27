import { Card, Checkbox } from 'antd';
import { IExam } from '~/types';

const ExamItem = ({ title, totalEssayQuestion, totalMCQuestion }: Partial<IExam>) => {
  return (
    <Card className='exam-item-card mt-5 rounded-lg shadow px-2 py-1.5'>
      <div className='flex items-center gap-2'>
        <Checkbox />
        <div className='grow line-clamp-1 text-base' title={title}>
          {title}
        </div>
        <div className='flex gap-x-5'>
          <div className='px-3 py-1 w-max rounded-2xl' style={{ backgroundColor: '#ffe7aa' }}>
            {totalMCQuestion} câu TN
          </div>
          <div className='px-3 py-1 w-max rounded-2xl' style={{ backgroundColor: '#c2f5e9' }}>
            {totalEssayQuestion} câu TL
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExamItem;
