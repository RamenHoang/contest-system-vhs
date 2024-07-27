import { Form, Input, Modal, DatePicker, Select } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IStartRequired } from '~/types';
import { useCheckTestAttempts } from '../hooks/use-check-test-attempts';

const AntModal = ({
  isModalOpen,
  setIsModalOpen,
  data,
  unit = null
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  data: IStartRequired;
  unit: number | null;
}) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const { mutate: checkTestAttempts } = useCheckTestAttempts();

  const navigate = useNavigate();

  const { id, slug } = useParams();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const participant = { ...values, unit };
        setIsModalOpen(false);
        checkTestAttempts({
          participant,
          callback: () =>
            navigate(`/competition/cuoc-thi/start/${id}/${slug}`, { state: { participant, from: location } })
        });

        // console.log(result);

        // const newPath = `/competition/cuoc-thi/start/${id}/${slug}`;
        // navigate(newPath, { state: { participant, from: location } });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const infoRequire = data?.infoRequire || [];

  const formFields = [
    { id: 1, label: 'Họ tên thí sinh', type: 'string', field: 'fullName' },
    { id: 2, label: 'Email', type: 'string', field: 'email' },
    { id: 3, label: 'Ngày sinh', type: 'date', field: 'birthday' },
    { id: 4, label: 'Số điện thoại', type: 'string', field: 'phone' },
    { id: 5, label: 'CCCD/CMND', type: 'string', field: 'CCCD' },
    { id: 6, label: 'Nghề nghiệp', type: 'string', field: 'job' },
    { id: 7, label: 'Giới tính', type: 'enum', field: 'sex' },
    { id: 8, label: 'Lớp, MSSV,Nơi công tác', type: 'string', field: 'other' },
  ];

  // @ts-expect-error type
  const getInputComponent = (field) => {
    switch (field?.type) {
      case 'string':
        return <Input placeholder={`Vui lòng nhập ${field.label.toLowerCase()}`} />;
      case 'date':
        return (
          <DatePicker
            style={{ width: '100%' }}
            format='YYYY-MM-DD'
            placeholder={`Vui lòng chọn ${field.label.toLowerCase()}`}
          />
        );
      case 'enum':
        return (
          <Select placeholder={`Vui lòng chọn ${field.label.toLowerCase()}`}>
            <Select.Option value='nam'>Nam</Select.Option>
            <Select.Option value='nữ'>Nữ</Select.Option>
            <Select.Option value='khác'>Khác</Select.Option>
          </Select>
        );
      default:
        return <Input />;
    }
  };

  return (
    <>
      <Modal
        width={650}
        title='Cập nhật thông tin'
        open={isModalOpen}
        onOk={handleOk}
        okText='Cập nhật'
        okButtonProps={{
          style: { background: '#dd3b3b', padding: '18px 32px' },
        }}
        cancelText='Hủy'
        cancelButtonProps={{
          style: { padding: '18px 32px' },
        }}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          {infoRequire?.map((id) => {
            const field = formFields.find((f) => f.id === id);
            return (
              <Form.Item
                key={field?.id}
                label={field?.label}
                name={field?.field}
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập ${field?.label.toLowerCase()}!`,
                  },
                ]}
              >
                {getInputComponent(field)}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </>
  );
};

export default AntModal;
