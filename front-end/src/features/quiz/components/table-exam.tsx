import { Button, Space, Table, Tag, Tooltip, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteExam } from "~/features/quiz/hooks/use-delete-exam";
import { useExams } from "~/features/quiz/hooks/use-exams";
import { IExam } from "~/types";

export const TableExam = () => {
  const navigate = useNavigate();

  const { data: exams, isLoading } = useExams();
  const { mutate: deleteExam } = useDeleteExam();

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa bài thi này?",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deleteExam(id);
      },
    });
  };

  const columns: ColumnsType<Partial<IExam>> = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 70,
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 200,
      ellipsis: { showTitle: true },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 100,
      ellipsis: { showTitle: true },
      render: (_, item) => (
        <Tag
          color="cyan"
          className="!text-gray-500 font-medium py-0.5 px-2 rounded-full"
        >
          {item.createdAt ? dayjs(item.createdAt).format("DD/MM/YYYY") : "-"}
        </Tag>
      ),
    },
    {
      title: "Số câu TN",
      key: "totalMCQuestion",
      dataIndex: "totalMCQuestion",
      align: "center",
      width: 100,
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      width: 100,
      align: "center",
      render: (_, item) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              htmlType="button"
              className="inline-flex items-center justify-center"
              icon={<PencilIcon className="h-4 w-4" />}
              onClick={() => {
                navigate(`/dashboard/quiz/${item.id}/edit`);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              danger
              type="text"
              htmlType="button"
              className="inline-flex items-center justify-center"
              icon={<TrashIcon className="h-4 w-4" />}
              onClick={() => showDeleteConfirm(String(item.id))}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      loading={isLoading}
      className="font-light"
      rowKey="code"
      dataSource={exams?.data}
      columns={columns}
      scroll={{ x: 570 }}
      pagination={{
        defaultPageSize: 10,
        showTotal: (total) => `Tổng ${total} kết quả`,
        position: ["bottomCenter"],
      }}
    />
  );
};
