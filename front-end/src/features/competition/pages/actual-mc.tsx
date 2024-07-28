import { useState, useEffect, useMemo } from 'react';
import { Button, Radio, Space, Spin, message, Modal, Input } from 'antd';
import { useStartCompetition } from '~/features/competition/hooks/use-start-competition';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import moment from 'moment'; // Add moment.js for easier date formatting
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSubmitAnswer } from '~/features/competition/hooks/use-submit-answer';
import { IStartRequired, ISubmitAnswer } from '~/types';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useCompetition } from '../hooks/use-competition';

export type TQuestionRes = {
  questionId: number;
  chosenAnswerId: number;
  typeQuestion: string;
  answerText?: string;
};

const { TextArea } = Input;

const Quiz = () => {
  const navigate = useNavigate();

  const { id, slug } = useParams();

  const { data: questionsData, isFetching } = useStartCompetition();

  if (questionsData && questionsData?.statusCode == 400) {
    navigate(`/competition/cuoc-thi/intro/${id}/${slug}`);
  }

  const { mutate: callSubmitAnswer } = useSubmitAnswer();
  const { data: competitionData } = useCompetition();
  const competition: IStartRequired = competitionData?.data;
  const { state } = useLocation(); // Retrieve state from location

  const questions = useMemo(() => questionsData?.data?.questions || [], [questionsData]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
  // const [detailedResults, setDetailedResults] = useState([]);

  const testDuration = competition.testDuration; // Set this to null for no time limit
  const [remainingTime, setRemainingTime] = useState(testDuration ? testDuration * 60 : null); // Convert to seconds

  // New state variables for start and finish time
  const [startTime, setStartTime] = useState<string | null>(null);
  const [finishTime, setFinishTime] = useState<string | null>(null);

  useEffect(() => {
    if (questions.length > 0 && !startTime) {
      setSelectedOptions(Array(questions?.length).fill(null));
      setEssayAnswers(Array(questions?.length).fill(''));
      // Set start time when questions are loaded
      setStartTime(moment().format('YYYY-MM-DD HH:mm:ss'));
    }

    if (testDuration) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime !== null && prevTime <= 1) {
            clearInterval(timer);
            handleSubmit(true);
            return 0;
          }
          return prevTime !== null ? prevTime - 1 : null;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [questions, testDuration]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectOption = (e: RadioChangeEvent) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = e.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  // @ts-expect-error aaa
  const handleEssayChange = (e) => {
    const newEssayAnswers = [...essayAnswers];
    newEssayAnswers[currentQuestion] = e.target.value;
    setEssayAnswers(newEssayAnswers);
  };

  const handleQuickNav = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = (autoSubmit = false) => {
    const finishTime = moment().format('YYYY-MM-DD HH:mm:ss'); // Set finish time before processing results
    setFinishTime(finishTime);

    const detailedResultData = questions.map(
      (question: { id: number; type: string; answers: { id: number }[] }, index: number) => ({
        questionId: question?.id,
        chosenAnswerId: question?.type === 'MC' ? question?.answers[selectedOptions[index]]?.id : null,
        typeQuestion: question?.type,
        answerText: question?.type === 'ESSAY' ? essayAnswers[index] : null
      }),
    );
    // setDetailedResults(detailedResultData);

    if (!autoSubmit) {
      message.success('Bài kiểm tra đã được nộp!');
    }

    const participant = {
      ...state?.participant,
      idSubUnit: state?.participant.unit,
      startTime: startTime,
      finishTime: finishTime
    };

    const finalData: ISubmitAnswer = {
      participant,
      results: detailedResultData,
    };

    callSubmitAnswer(finalData, {
      onSuccess: (res) => {
        const { userName, totalCorrectAnswers, correctAnswersRate, duration } = res && res.data;
        // Navigate back to the intro page with the results data
        localStorage.setItem(
          'quizResult',
          JSON.stringify({ userName, totalCorrectAnswers, correctAnswersRate, duration })
        );

        navigate(`/competition/cuoc-thi/intro/${id}/${slug}`);
      },
    });
  };

  const showConfirmSubmitModal = () => {
    Modal.confirm({
      title: 'Thông báo',
      content: `Bạn đã hoàn thành ${selectedOptions.filter((option) => option !== null).length} / ${questions.length} câu hỏi. Bạn có muốn nộp bài thi này?`,
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: handleSubmit
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (startTime && finishTime) {
    }
  }, [startTime, finishTime]);

  return (
    <div>
      <div className='bg-cyan-700 sticky min-h-[80px] text-base top-0 z-10 flex items-center'>
        <div className='grow flex justify-between items-center py-5 px-3 h-full'>
          <div className='flex text-lg text-white'>
            <span>{currentQuestion + 1}</span>
            <span>&nbsp;/&nbsp;</span>
            <span>{questions.length}</span>
            <span>&nbsp;câu</span>
          </div>
          <div className='bg-white text-theme-color py-1 px-3 text-center min-w-[100px] rounded-2xl'>
            {testDuration && remainingTime !== null ? formatTime(remainingTime) : 'Không giới hạn'}
          </div>
        </div>
      </div>
      {!isFetching ? (
        <div style={{ minHeight: `calc(100vh - 80px)` }} className='bg-white rounded-t-3xl md:rounded-none'>
          <div className='grid grid-cols-12 md:gap-4 p-4 text-sm lg:text-base'>
            <div className='col-span-12 md:col-span-4 xl:col-span-3 sticky top-[80px] px-0 z-[1] md:order-2'>
              <Button className='uppercase text-base font-light w-full py-5' onClick={showConfirmSubmitModal}>
                Nộp bài
              </Button>
              <div className='flex overflow-auto py-2 bg-white md:flex-wrap md:border rounded-xl md:p-4 md:justify-center'>
                {questions.map((_: unknown, index: number) => (
                  <div key={index} className='flex flex-col items-center'>
                    <Button
                      shape='circle'
                      onClick={() => handleQuickNav(index)}
                      type={index === currentQuestion ? 'primary' : 'default'}
                      style={{
                        backgroundColor:
                          selectedOptions[index] !== null || essayAnswers[index] ? '#0e76aa' : 'lightgray',
                        borderColor: selectedOptions[index] !== null || essayAnswers[index] ? '#0e76aa' : 'lightgray',
                        color: 'white',
                        margin: '0 5px'
                      }}
                    >
                      {index + 1}
                    </Button>
                    {index === currentQuestion && <div className='solid #0e76aa'>_</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className='relative col-span-12 md:col-span-8 xl:col-span-9 md:border rounded-xl p-4 md:order-1'>
              <div className='hidden sticky top-[250px] left-0 md:flex items-center justify-center w-12 h-12 text-slate-500 border border-slate-500 rounded-full mx-0'>
                <Button
                  type='link'
                  onClick={handlePrev}
                  shape='circle'
                  icon={<ChevronLeft />}
                  disabled={currentQuestion === 0}
                />
              </div>
              <div className='hidden sticky top-[250px] left-[calc(100%-48px)] md:flex items-center justify-center w-12 h-12 bg-cyan-700 text-slate-500 rounded-full mx-0'>
                <Button
                  type='link'
                  onClick={handleNext}
                  className='text-white'
                  shape='circle'
                  icon={<ChevronRight />}
                  disabled={currentQuestion === questions.length - 1}
                />
              </div>
              <div className='pb-10 md:px-20'>
                <div className='font-medium text-lg mb-3'>{questions[currentQuestion]?.title}</div>
                {questions[currentQuestion]?.type === 'MC' ? (
                  <Radio.Group onChange={handleSelectOption} value={selectedOptions[currentQuestion]}>
                    <Space direction='vertical' className='flex gap-4'>
                      {questions[currentQuestion]?.answers.map(
                        (answer: { id: number; answer: string }, index: number) => (
                          <Radio key={answer.id} value={index}>
                            <span className='text-base tracking-normal'>{answer.answer}</span>
                          </Radio>
                        ),
                      )}
                    </Space>
                  </Radio.Group>
                ) : (
                  <TextArea
                    rows={4}
                    value={essayAnswers[currentQuestion]}
                    onChange={handleEssayChange}
                    placeholder='Viết câu trả lời...'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center min-h-screen'>
          <Spin size='large' />
        </div>
      )}
    </div>
  );
};

export default Quiz;
