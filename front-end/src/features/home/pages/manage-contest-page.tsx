import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { TableContest } from "~/features/home/components/table-contest";
import { useCreateCompetition } from "~/features/home/hooks/use-create-competition";

const ManageContest = () => {
  const navigate = useNavigate();

  const { mutate: createCompetition } = useCreateCompetition();

  const handleCreateCompetition = () => {
    const now = dayjs();
    const timeStart = now.add(7, "day").format("YYYY-MM-DD HH:mm:ss");
    const timeEnd = now.add(14, "day").format("YYYY-MM-DD HH:mm:ss");

    const finalData = {
      name: "Cuộc thi mới nè",
      rules: "Thể lệ cuộc thi",
      timeStart: timeStart,
      timeEnd: timeEnd,
      infoRequire: "1, 2",
    };

    createCompetition(finalData, {
      onSuccess: (res) => {
        const id = res?.data;
        navigate(`/dashboard/contest/${id}/edit`);
      },
    });
  };

  return (
    <div className="mx-auto p-4 min-h-screen">
      <div className="mb-4">
        <div className="text-[#757575] uppercase text-[27px] leading-[34px] font-normal mb-4">
          Tổ chức cuộc thi trực tuyến
        </div>
        <div className="flex items-center gap-10">
          <div
            className='flex items-center justify-center rounded-xl p-3 w-[80px] h-[80px] bg-orange-500/90 cursor-pointer'
            onClick={handleCreateCompetition}
          >
            <img
              src="https://myaloha.vn/image/dashboard/create_new_ic.png"
              alt="createBtn"
              className="h-[50px] hover:scale-[1.1] transition-all duration-300"
            />
          </div>
          <div className="mt-2">Tạo mới</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-[#757575] uppercase text-[27px] leading-[34px] font-normal mb-4">
          Danh sách cuộc thi
        </div>

        <TableContest />
      </div>
    </div>
  );
};

export default ManageContest;
