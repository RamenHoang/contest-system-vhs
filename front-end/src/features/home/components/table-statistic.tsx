import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useStatistics } from '~/features/competition/hooks/use-statistic';
import { IStatistic } from '~/types';

export const TableStatistic = () => {
  const { data: statistics, isPending: isLoading } = useStatistics();

  const columns: ColumnsType<Partial<IStatistic>> = [
    {
      title: 'No.',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      width: 70,
      render: (_, __, index) => <span>{index + 1}</span>
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 250,
      ellipsis: { showTitle: true }
    },
    {
      title: 'Thời gian làm',
      dataIndex: 'duration',
      key: 'duration',
      width: 200,
      ellipsis: { showTitle: true },
      align: 'center',
      render: (value) => (
        <Tag color='#1677ff' className='!text-white font-medium py-0.5 px-2 rounded-md'>
          {value}
        </Tag>
      )
    },
    {
      title: 'Kết quả',
      key: 'totalCorrectAnswers',
      dataIndex: 'totalCorrectAnswers',
      width: 120,
      align: 'center',
      render: (value) => (
        <Tag color='#389e0d' className='!text-white font-medium py-0.5 px-2 rounded-md'>
          {value ?? '-'}
        </Tag>
      )
    },
    {
      title: 'Độ chính xác',
      key: 'correctAnswersRate',
      dataIndex: 'correctAnswersRate',
      width: 120,
      render: (value) => (
        <Tag color='#fa8c16' className='!text-white font-medium py-0.5 px-2 rounded-md'>
          {value ?? 0}%
        </Tag>
      )
    }
  ];

  return (
    <Table
      loading={isLoading}
      className='font-light'
      rowKey='code'
      dataSource={statistics?.data}
      columns={columns}
      scroll={{ x: 870 }}
    />
  );
};
