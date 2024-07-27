import { Button, Input, message, QRCode, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CompetitionApi } from "~/api/competition-api";
import { useCompetition } from "~/features/competition/hooks/use-competition";
import { IStartRequired } from "~/types";
import { toSlug } from "~/utils/helpers";
import { CopyOutlined } from "@ant-design/icons";

export const FormPublish = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: competitionData } = useCompetition();
  const competition: IStartRequired = competitionData?.data;
  const slug = toSlug(competition?.name || "");

  const handleSubmit = async () => {
    const res = await CompetitionApi.publishCompetition(id as string);
    try {
      if (res?.statusCode === 200) {
        message.success("Chỉnh sửa thành công");
        navigate(`/dashboard/contest/`);
      }
    } catch (err) {
      message.error("Chỉnh sửa thất bại");
      console.log(err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_DOMAIN_APP}/competition/cuoc-thi/intro/${id}/${slug}`,
    );
    message.success("Đã sao chép liên kết");
  };

  const showConfirm = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xuất bản cuộc thi này không?",
      onOk: handleSubmit,
      okText: "Xác nhận",
      onCancel() {},
      cancelText: "Huỷ",
    });
  };

  return (
    <div className="-mt-10">
      <div className="mb-4">
        <label className="block mb-1 text-[15px] text-[#757575] font-medium">
          Link rút gọn
        </label>
        <Input
          size="large"
          value={`${import.meta.env.VITE_DOMAIN_APP}/competition/cuoc-thi/intro/${id}/${slug}`}
          readOnly
          addonAfter={
            <Button type="link" icon={<CopyOutlined />} onClick={handleCopy}>
              Copy
            </Button>
          }
        />
      </div>

      <div>
        <label className="block mb-1 text-[15px] text-[#757575] font-medium">
          Mã QR bài thi
        </label>
        <QRCode
          value={
            `${import.meta.env.VITE_DOMAIN_APP}/competition/cuoc-thi/intro/${id}/${slug}` ||
            "-"
          }
          size={250}
        />
      </div>

      <div className="mt-5 flex justify-center gap-3">
        <Button className="p-5" onClick={showConfirm} type="primary">
          Xuất bản
        </Button>
      </div>
    </div>
  );
};
