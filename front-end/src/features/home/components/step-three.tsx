import { Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { useListAvailableCompetitionUnits } from '~/features/competition/hooks/use-list-available-competition-units';
import { TableSubUnit } from '~/features/home/components/table-subunit';
import { useCreateSubUnit } from '~/features/home/hooks/use-create-subunit';
import { ISubUnit } from '~/types';

const StepThree = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnitIds, setSelectedUnitIds] = useState([]);

  const { data: availableUnits } = useListAvailableCompetitionUnits();

  const options = availableUnits?.data.map((data: ISubUnit) => ({
    value: data?.id,
    label: data?.name
  }));

  const { mutate: createSubUnit, isPending } = useCreateSubUnit();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedUnitIds.length > 0) {
      createSubUnit(selectedUnitIds);
      setIsModalOpen(false);
      setSelectedUnitIds([]);
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='relative shadow-md sm:rounded-lg px-2 pb-4 mt-4'>
        <div className='flex items-center justify-end py-2'>
          <Button type='primary' onClick={showModal}>
            Thêm đơn vị
          </Button>
        </div>
        <TableSubUnit />
      </div>
      <Modal
        title='Thêm đơn vị'
        open={isModalOpen}
        okText='Xác nhận'
        cancelText='Hủy'
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isPending}
      >
        <Select
          mode='multiple'
          onChange={(selectedItems) => {
            const selectedIds = selectedItems.map((item: number) => Number(item));
            setSelectedUnitIds(selectedIds);
          }}
          style={{ width: '100%' }}
          options={options}
        />
      </Modal>
    </>
  );
};

export default StepThree;
