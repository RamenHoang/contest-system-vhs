import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Upload,
} from "antd";
import { format } from "date-fns";
import { isEmpty } from "lodash";
import { UploadIcon } from "lucide-react";
import { SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { useCompetition } from "~/features/competition/hooks/use-competition";
import { useCreateCompetition } from "~/features/home/hooks/use-create-competition";
import { useGetInfoRequired } from "~/features/home/hooks/use-info-required";
import { useInfo } from "~/hooks/useInfo";
import { ICompetition } from "~/types";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { useRefresh } from "~/features/home/context/refresh-context";
import dayjs from "dayjs";
import { Color } from "antd/es/color-picker";

const normFile = (e: { fileList: unknown }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const FormContest: React.FC = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [bannerUrl, setBannerUrl] = useState<string | undefined>("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const user = useInfo();
  const { mutate: createCompetition } = useCreateCompetition();
  const { data: competitionData } = useCompetition();
  const competition: ICompetition = competitionData?.data;
  const [form] = Form.useForm<ICompetition>();
  const { triggerRefresh } = useRefresh();

  useEffect(() => {
    if (!competition || isEmpty(competition)) {
      return;
    }

    const {
      name,
      rules,
      timeEnd,
      timeStart,
      infoRequire,
      password,
      bannerUrl,
      themeColor,
    } = competition;

    form.setFieldsValue({
      name,
      rules,
      // @ts-expect-error null
      timeStart: timeStart && dayjs(timeStart),
      // @ts-expect-error null
      timeEnd: timeEnd && dayjs(timeEnd),
      password,
      bannerUrl,
      themeColor,
    });

    setSelectedValues(
      Array.isArray(infoRequire)
        ? infoRequire
        : infoRequire
          ? infoRequire.split(", ")
          : [],
    );
  }, [competition, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (checkedValues: SetStateAction<string[]>) => {
    setSelectedValues(checkedValues);
  };

  const { data: listInfoRequired } = useGetInfoRequired();

  const handleUploadChange = (
    info: UploadChangeParam<
      UploadFile<{ data: SetStateAction<string | undefined> }>
    >,
  ) => {
    if (info.file.status === "done") {
      setImageUploaded(true);
      setBannerUrl(info?.file?.response?.data);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      setImageUploaded(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSubmit = (data: ICompetition) => {
    if (!imageUploaded) {
      message.error("Vui lòng tải ảnh banner");
      return;
    }
    const finalData = {
      ...data,
      id: parseInt(id as string),
      timeStart: format(new Date(data.timeStart), "yyyy-MM-dd HH:mm:ss"),
      timeEnd: format(new Date(data.timeEnd), "yyyy-MM-dd HH:mm:ss"),
      bannerUrl,
      infoRequire: selectedValues.join(", "),
    };

    createCompetition(finalData, {
      onSuccess: () => {
        triggerRefresh();
      },
    });
  };

  const [color] = useState<Color>();

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Banner"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Vui lòng upload banner",
            },
          ]}
        >
          <Upload
            headers={{
              Authorization: `Bearer ${user?.accessToken}`,
            }}
            action={`${import.meta.env.VITE_DOMAIN_URL}/api/v1/competitions/upload-image`}
            listType="picture"
            onChange={handleUploadChange}
            // beforeUpload={(e) => console.log(e)}
            maxCount={1}
          >
            <Button className="w-[282px]" icon={<UploadIcon size={20} />}>
              Tải lên
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Tên cuộc thi"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên đơn ban tổ chức!" },
          ]}
        >
          <Input
            placeholder="Vui lòng nhập tên cuộc thi"
            defaultValue="Cuộc thi mới"
          />
        </Form.Item>
        <Form.Item
          label="Thể lệ"
          name="rules"
          rules={[
            { required: true, message: "Vui lòng nhập thể lệ cuộc thi!" },
          ]}
        >
          <Input
            placeholder="Thể lệ cuộc thi.."
            defaultValue="Thể lệ cuộc thi"
          />
        </Form.Item>
        <Form.Item
          label="Ngày bắt đầu"
          name="timeStart"
          rules={[
            { required: true, message: "Vui lòng nhập thời gian bắt đầu!" },
          ]}
        >
          <DatePicker
            placeholder="Chọn ngày bắt đầu"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          name="timeEnd"
          rules={[
            { required: true, message: "Vui lòng nhập thời gian bắt đầu!" },
          ]}
        >
          <DatePicker
            placeholder="Chọn ngày kết thúc"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        <Form.Item label="Mật khẩu" name="password">
          <Input.Password placeholder="Nhập mật khẩu cuộc thi..." />
        </Form.Item>
        <Form.Item label="Thông tin bắt buộc">
          <Input
            value="Họ tên, Số điện thoại, Email"
            onClick={showModal}
            className="cursor-pointer bg-gray-200"
          />
        </Form.Item>
        <Form.Item
          name="themeColor"
          initialValue={{ value: "" }}
          label="Màu chủ đề"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn màu chủ đề",
            },
            () => ({
              validator(_, value) {
                if (value === "#000000") {
                  return Promise.reject(new Error("Vui lòng chọn màu khác"));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <ColorPicker
            value={color}
            onChange={(_, hex) => {
              form.setFieldsValue({ themeColor: hex });
            }}
            showText
          />
        </Form.Item>
        <div className="mt-5 mb-2 flex justify-end gap-3">
          <Button size="middle" htmlType="submit" type="primary">
            Xác nhận
          </Button>
        </div>
      </Form>
      <Modal
        title="Thông tin bắt buộc (Yêu cầu người tham dự nhập vào)"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Checkbox.Group
          style={{ width: "100%" }}
          value={selectedValues}
          onChange={onChange}
        >
          <Row>
            {listInfoRequired?.data?.map(
              (item: { id: number; label: string }) => (
                <Col span={12} key={item.id}>
                  <Checkbox value={item.id}>{item.label}</Checkbox>
                </Col>
              ),
            )}
          </Row>
        </Checkbox.Group>
      </Modal>
    </>
  );
};
