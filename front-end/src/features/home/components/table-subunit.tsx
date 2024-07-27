import { Button, Modal, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TrashIcon } from 'lucide-react';
import { useSubUnits } from '~/features/home/hooks/use-subunits';
import { ISubUnit } from '~/types';
import { useDeleteCompetitionUnit } from '../hooks/use-delete-competition-unit';

export const TableSubUnit = () => {
  const { data: subUnits, isPending: isLoading } = useSubUnits();
  const { mutate: deleteCompetitionUnit } = useDeleteCompetitionUnit()
  // const { mutate: updateSubUnit } = useUpdateSubUnit();

  // const [editingId, setEditingId] = useState<string | null>(null);
  // const [editingName, setEditingName] = useState<string>('');

  // const handleEdit = (id: string, name: string) => {
  //   setEditingId(id);
  //   setEditingName(name);
  // };

  // const handleUpdate = () => {
  //   if (editingId) {
  //     updateSubUnit({ id: editingId, name: editingName });
  //     setEditingId(null);
  //     setEditingName('');
  //   }
  // };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn xóa đơn vị này khỏi cuộc thi?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        deleteCompetitionUnit(id);
        window.location.reload();
      }
    });
  };

  const columns: ColumnsType<Partial<ISubUnit>> = [
    {
      title: 'No.',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      width: 20,
      render: (_, __, index) => <span>{index + 1}</span>
    },
    {
      title: 'Tên đơn vị con',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      ellipsis: { showTitle: true },
      // render: (name, record) => {
      //   // @ts-expect-error eee
      //   return editingId === record.id ? (
      //     <Input
      //       value={editingName}
      //       onChange={(e) => setEditingName(e.target.value)}
      //       onBlur={handleUpdate}
      //       onPressEnter={handleUpdate}
      //     />
      //   ) : (
      //     <span>{name}</span>
      //   );
      // }
    },
    {
      title: 'Thao tác',
      key: 'action',
      dataIndex: 'action',
      width: 20,
      align: 'center',
      render: (_, record) => (
        <Space size='small'>
          {/* <Tooltip title='Chỉnh sửa'>
            <Button
              type='text'
              htmlType='button'
              className='inline-flex items-center justify-center'
              icon={<PencilIcon className='h-4 w-4' />}
              // @ts-expect-error aaa
              onClick={() => handleEdit(record.id as string, record.name as string)}
            />
          </Tooltip> */}
          <Tooltip title='Xóa'>
            <Button
              danger
              type='text'
              htmlType='button'
              className='inline-flex items-center justify-center'
              icon={<TrashIcon className='h-4 w-4' />}
              onClick={() => showDeleteConfirm(Number(record.id))}
              // Add your delete functionality here
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <Table
      loading={isLoading}
      className='font-light'
      rowKey='id' // Adjust according to your data
      dataSource={subUnits?.data}
      columns={columns}
      // scroll={{ x: 870 }}
    />
  );
};
