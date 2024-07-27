import { Modal, Popover, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import { Footer } from "~/features/competition/components/footer";
import { Header } from "~/features/competition/components/header";
import AntModal from "~/features/competition/components/modal";
import { useCompetition } from "~/features/competition/hooks/use-competition";
import { IStartRequired, IStatistic } from "~/types";
import RankingList from "~/features/competition/components/ranking";
import { useStatistics } from "~/features/competition/hooks/use-statistic";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "~/hooks/useLogin";
import { hexToRGBA } from "~/utils/helpers";

type IResult = {
  userName: string;
  totalCorrectAnswers: number;
  correctAnswersRate: number;
  duration: string;
};

const IntroPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useLogin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState<IResult | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);

  const { data: competitionData } = useCompetition();
  const { data: statisticsData } = useStatistics();
  const competition: IStartRequired = competitionData?.data;
  const options = competition?.units.map((unit) => ({
    value: unit.id,
    label: unit.name
  }));
  const statistics: IStatistic[] = statisticsData?.data;
  const timeEnd = competition?.timeEnd;

  const popoverContent = (
    <div>
      <p>{competition?.rules}</p>
    </div>
  );

  // Function to calculate the remaining time
  const calculateTimeLeft = () => {
    const difference = +new Date(timeEnd) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  // Function to show the results modal
  const showResultsModal = () => {
    if (results) {
      Modal.info({
        title: `${results.userName} đã hoàn thành bài thi`,
        content: (
          <div>
            <p>Số câu đúng: {results.totalCorrectAnswers}</p>
            {/* <p>Tỉ lệ trả lời đúng: {results.correctAnswersRate}%</p> */}
            <p>Thời gian làm bài: {results.duration}</p>
          </div>
        ),
        onOk() {
          // Clear results from local storage after displaying the modal
          localStorage.removeItem("quizResult");
          setResults(null);
        },
      });
    }
  };

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("quizResult") ?? "{}");
    if (!isEmpty(savedResults)) {
      setResults(savedResults);
    }
  }, []);

  useEffect(() => {
    if (results) {
      showResultsModal();
    }
  }, [results]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeEnd]);

  const handleOpenModal = () => {
    if (competition?.password) {
      setIsPasswordModalOpen(true);
    } else if (competition.units.length > 0) {
      setIsUnitModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === competition?.password) {
      message.success('Mật khẩu chính xác!');
      setIsPasswordModalOpen(false);
      if (competition.units.length > 0) {
        setIsUnitModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } else {
      message.error('Mật khẩu không chính xác!');
    }
  };

  const handleUnitSubmit = () => {
    if (!selectedUnit) {
      message.error('Vui lòng chọn ít nhất một đơn vị');
      return;
    }

    setIsUnitModalOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header data={competition} />
      <main>
        <section>
          <div className='mx-auto py-6 lg:py-16 bg-no-repeat bg-[url("https://www.pixel4k.com/wp-content/uploads/2018/09/pattern-background-light-line-texture-4k_1536097739.jpg.webp")] bg-cover'>
            <div
              className="text-center text-cyan-700 text-xl lg:text-4xl font-bold uppercase"
              style={{ color: hexToRGBA(competition?.themeColor, 1) }}
            >
              Cuộc thi kết thúc trong
            </div>
            <div className="mt-4 lg:mt-8">
              <div
                style={{ color: hexToRGBA(competition?.themeColor, 1) }}
                className="flex items-center justify-center gap-4 lg:gap-8 text-cyan-700"
              >
                <div className="px-4 py-6 shadow-md min-w-[70px] lg:min-w-[130px] text-center rounded-lg">
                  <div
                    style={{ color: hexToRGBA(competition?.themeColor, 1) }}
                    className="text-xl lg:text-4xl text-cyan-700 font-bold"
                  >
                    {timeLeft.days}
                  </div>
                  <div className="lg:text-xl mt-2 text-[#686868]"> Ngày </div>
                </div>
                <div className="px-4 py-6 shadow-md min-w-[70px] lg:min-w-[130px] text-center rounded-lg">
                  <div
                    style={{ color: hexToRGBA(competition?.themeColor, 1) }}
                    className="text-xl lg:text-4xl text-cyan-700 font-bold"
                  >
                    {timeLeft.hours}
                  </div>
                  <div className="lg:text-xl mt-2 text-[#686868]"> Giờ </div>
                </div>
                <div className="px-4 py-6 shadow-md min-w-[70px] lg:min-w-[130px] text-center rounded-lg">
                  <div
                    style={{ color: hexToRGBA(competition?.themeColor, 1) }}
                    className="text-xl lg:text-4xl text-cyan-700 font-bold"
                  >
                    {timeLeft.minutes}
                  </div>
                  <div className="lg:text-xl mt-2 text-[#686868]"> Phút </div>
                </div>
                <div className="px-4 py-6 shadow-md min-w-[70px] lg:min-w-[130px] text-center rounded-lg">
                  <div
                    style={{ color: hexToRGBA(competition?.themeColor, 1) }}
                    className="text-xl lg:text-4xl text-cyan-700 font-bold"
                  >
                    {timeLeft.seconds}
                  </div>
                  <div className="lg:text-xl mt-2 text-[#686868]"> Giây </div>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-8 flex items-center justify-center gap-4 lg:gap-8">
              <button
                type="button"
                className="inline-flex justify-center items-center px-4 py-2 border shadow-sm transition ease-in-out duration-150 gap-2 cursor-pointer min-h-[40px] disabled:cursor-not-allowed font-sans rounded-full bg-cyan-700 border-theme-color text-white hover:shadow-sm text-lg lg:text-2xl min-w-[150px] lg:min-w-[200px]"
                style={{
                  backgroundColor: hexToRGBA(competition?.themeColor, 1),
                }}
                onClick={handleOpenModal}
              >
                Tham gia
              </button>
              <Popover content={popoverContent} title='Thể lệ' trigger='click' placement='bottom'>
                <button
                  type='button'
                  style={{
                    backgroundColor: hexToRGBA(competition?.themeColor, 1),
                  }}
                  className='inline-flex justify-center items-center px-4 py-2 border shadow-sm transition ease-in-out duration-150 gap-2 cursor-pointer min-h-[40px] disabled:cursor-not-allowed font-sans rounded-full bg-cyan-700 border-theme-color text-white hover:shadow-sm text-lg lg:text-2xl min-w-[150px] lg:min-w-[200px]'
                >
                  Thể lệ
                </button>
              </Popover>
              <div></div>
            </div>
          </div>
        </section>
        <section id="leaderboard">
          <div className="container mx-auto px-2 lg:px-4 mt-6 lg:mt-16">
            <div className="lg:hidden">
              <div
                className="text-2xl lg:text-4xl text-cyan-700 font-bold grow mb-2 md:mb-0"
                style={{ color: hexToRGBA(competition?.themeColor, 1) }}
              >
                THỐNG KÊ
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl w-full text-center py-2 mb-6">
                  <div
                    style={{ color: hexToRGBA(competition?.themeColor, 1) }}
                    className="text-cyan-700 font-semibold text-3xl"
                  >
                    {competition?.participant}
                  </div>
                  lượt thi
                </div>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="hidden lg:block min-w-[250px]">
                <div className='flex justify-center items-end h-full bg-no-repeat bg-cover bg-center rounded-2xl bg-[url("https://myaloha.vn/image/contest/leaderboard.png")]'>
                  <div className="grow mx-4">
                    <div className="bg-white rounded-2xl w-full text-center py-2 mb-6">
                      <div
                        style={{ color: hexToRGBA(competition?.themeColor, 1) }}
                        className="text-cyan-700 font-semibold text-3xl"
                      >
                        {competition?.participant}
                      </div>
                      lượt thi
                    </div>
                  </div>
                </div>
              </div>
              <div className="block grow">
                <div className="block md:flex items-center mb-6">
                  <div
                    style={{ color: hexToRGBA(competition?.themeColor, 1) }}
                    className="text-2xl lg:text-4xl text-cyan-700 font-bold grow mb-2 md:mb-0"
                  >
                    BẢNG XẾP HẠNG
                  </div>
                </div>
                <div>
                  <div className="max-h-[550px] overflow-auto shadow-sm">
                    <RankingList listRanking={statistics} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-2 lg:px-4 mt-6 lg:mt-16"></div>
        <Footer />
      </main>
      <AntModal data={competition} unit={selectedUnit} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Modal
        title="Nhập mật khẩu cuộc thi"
        open={isPasswordModalOpen}
        onOk={handlePasswordSubmit}
        okText="Xác nhận"
        onCancel={() => setIsPasswordModalOpen(false)}
        cancelText="Huỷ"
      >
        <Input.Password
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
          placeholder="Nhập mật khẩu cuộc thi"
        />
      </Modal>
      <Modal
        title="Chọn đơn vị"
        open={isUnitModalOpen}
        onOk={handleUnitSubmit}
        okText="Xác nhận"
        onCancel={() => setIsUnitModalOpen(false)}
        cancelText='Huỷ'
      >
        <Select
          onChange={(unitId) => {
            setSelectedUnit(unitId);
          }}
          style={{ width: '100%' }}
          options={options}
        />
      </Modal>
    </div>
  );
};

export default IntroPage;
