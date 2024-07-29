import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import { CopyIcon, Download, PencilIcon, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCopyCompetition } from '~/features/competition/hooks/use-copy-competition';
import { useDeleteCompetition } from '~/features/competition/hooks/use-delete-competition';
import { useExportExcelRow } from '~/features/competition/hooks/use-export-excel_row';
import { useUserCompetitions } from '~/features/competition/hooks/use-user-competitions';
import { IListCompetition } from '~/types';

const statusToTagName: Record<string, string> = {
  'Đang diễn ra': '#faad14',
  'Kết thúc': '#52c41a',
  'Chưa bắt đầu': '#cac9c9'
};

export const TableContest = () => {
  const navigate = useNavigate();

  const { data: userCompetitions, isPending: isLoading } = useUserCompetitions();
  const { mutate: deleteCompetition } = useDeleteCompetition();
  const { mutate: copyCompetition } = useCopyCompetition();
  const { exportExcel, loading } = useExportExcelRow();

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn xóa cuộc thi này?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        deleteCompetition(id);
        window.location.reload();
      }
    });
  };

  const showCopyConfirm = (id: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn nhân đôi cuộc thi này?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        copyCompetition(id);
        window.location.reload();
      }
    });
  };

  const handleExport = (id: string) => {
    exportExcel(id, 1, 100);
  };

  const columns: ColumnsType<Partial<IListCompetition>> = [
    {
      title: 'No.',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      width: 70,
      render: (_, __, index) => <span>{index + 1}</span>
    },
    {
      title: 'Tên cuộc thi',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: { showTitle: true }
    },
    {
      title: 'Thời gian diễn ra',
      dataIndex: 'timeStart',
      key: 'timeStart',
      width: 200,
      ellipsis: { showTitle: true },
      render: (value, record) => (
        <Tag color='#54a0fc' className='text-white font-medium py-0.5 px-2 rounded-full'>
          {format(new Date(value), 'dd/MM/yyyy') ?? '-'} &mdash;{' '}
          {record?.timeEnd ? format(new Date(record.timeEnd), 'dd/MM/yyyy') : '-'}
        </Tag>
      )
    },
    {
      title: 'Tổng số lượt thi',
      dataIndex: 'numberOfParticipants',
      key: 'numberOfParticipants',
      width: 150,
      ellipsis: { showTitle: true }
    },
    {
      title: 'Trạng thái',
      key: 'timeEnd',
      dataIndex: 'timeEnd',
      width: 130,
      render: (_, record) => {
        const now = new Date();
        const timeStart = new Date(record?.timeStart as string);
        const timeEnd = new Date(record?.timeEnd as string);

        let statusText;
        if (now >= timeStart && now <= timeEnd) {
          statusText = 'Đang diễn ra'; // Ongoing
        } else if (now > timeEnd) {
          statusText = 'Kết thúc'; // Ended
        } else {
          statusText = 'Chưa bắt đầu'; // Not started
        }

        const tagName = statusToTagName[statusText];
        return (
          <Tag color={tagName} className='!text-white font-medium py-0.5 px-2 rounded-full'>
            {statusText}
          </Tag>
        );
      }
    },
    {
      title: '',
      key: 'isPublic',
      dataIndex: 'isPublic',
      width: 120,
      align: 'center',
      render: (_, record) => {
        if (record.isPublic === 'Xuất bản') {
          return (
            <Tag color='#52c41a' className='!text-white font-medium py-0.5 px-2 rounded-full'>
              Đã xuất bản
            </Tag>
          );
        }

        return (
          <Tag color='#faad14' className='!text-white font-medium py-0.5 px-2 rounded-full'>
            Chưa xuất bản
          </Tag>
        );
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      dataIndex: 'action',
      width: 150,
      align: 'center',
      render: (_, item) => (
        <Space size='small'>
          <Tooltip title='Chỉnh sửa'>
            <Button
              type='text'
              htmlType='button'
              className='inline-flex items-center justify-center'
              icon={<PencilIcon className='h-4 w-4' />}
              onClick={() => {
                navigate(`/dashboard/contest/${item.id}/edit?step=1`);
              }}
            />
          </Tooltip>
          <Tooltip title='Nhân đôi'>
            <Button
              type='text'
              htmlType='button'
              className='inline-flex items-center justify-center'
              icon={<CopyIcon className='h-4 w-4' />}
              onClick={() => showCopyConfirm(String(item.id))}
            />
          </Tooltip>
          <Tooltip title='Xóa'>
            <Button
              danger
              type='text'
              htmlType='button'
              className='inline-flex items-center justify-center'
              icon={<TrashIcon className='h-4 w-4' />}
              onClick={() => showDeleteConfirm(String(item.id))}
            />
          </Tooltip>
          <Tooltip title='Tải xuống'>
            <Button
              type='text'
              htmlType='button'
              className='inline-flex items-center justify-center'
              icon={<Download className='h-4 w-4' />}
              onClick={() => handleExport(String(item.id))}
              loading={loading}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <>
      <Table
        loading={isLoading}
        className='font-light'
        rowKey='code'
        dataSource={userCompetitions?.data}
        columns={columns}
        scroll={{ x: 870 }}
        pagination={{
          defaultPageSize: 10,
          showTotal: (total) => `Tổng ${total} kết quả`,
          position: ['bottomCenter']
        }}
      />
    </>
  );
};
