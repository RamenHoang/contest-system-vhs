import { useState } from 'react';
import { Button, DatePicker } from 'antd';
import { Download } from 'lucide-react';
import { useInfoStep2 } from '~/features/competition/hooks/use-info-step2';
import DashboardCard from '~/features/home/components/dashboard-card';
import { TableStatistic } from '~/features/home/components/table-statistic';
import { useExportExcel } from '~/features/competition/hooks/use-export-excel';

const StepFive = () => {
  const { data: infoStep2 } = useInfoStep2();
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState(null);

  // @ts-expect-error date
  const formattedFromDate = fromDate ? fromDate.format('YYYY-MM-DD HH:mm:ss') : null;
  // @ts-expect-error date
  const formattedToDate = toDate ? toDate.format('YYYY-MM-DD HH:mm:ss') : null;

  const { exportExcel, loading } = useExportExcel();

  const handleExport = () => {
    if (!fromDate || !toDate) {
      // Add some validation
      console.error('Please select both dates');
      return;
    }
    exportExcel(1, 100, formattedFromDate, formattedToDate);
  };

  return (
    <div className='step-five'>
      {/* <div className='flex items-center gap-8'>
        <DashboardCard
          imgSrc='https://myaloha.vn/image/dashboard/human.png'
          title='Tổng lượt thi'
          text={infoStep2?.data?.testAttempts}
        />
      </div> */}
      <div className='mt-8'>
        <div className='text-[#757575] uppercase text-[23px] leading-[29px] font-semibold mb-4'> Kết quả thi </div>
        <div className='relative shadow-md sm:rounded-lg px-2 pb-4 flex items-center justify-end gap-4'>
          <DatePicker
            placeholder='Từ ngày'
            format='YYYY-MM-DD HH:mm:ss'
            size='large'
            // @ts-expect-error date
            onChange={(date) => setFromDate(date)}
          />
          <DatePicker
            placeholder='Đến ngày'
            format='YYYY-MM-DD HH:mm:ss'
            size='large'
            // @ts-expect-error date
            onChange={(date) => setToDate(date)}
          />
          <Button type='default' icon={<Download size={16} />} size='large' onClick={handleExport} loading={loading}>
            Tải xuống
          </Button>
        </div>
        <TableStatistic />
      </div>
    </div>
  );
};

export default StepFive;
