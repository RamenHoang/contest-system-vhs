import { Button, Flex, Input, Radio, Tooltip, Modal, Checkbox } from 'antd';
import { ChevronDown, ChevronUp, Plus, X, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDeleteQuestion } from '~/features/quiz/hooks/use-delete-question';
import { IQuestion } from '~/types';
const { TextArea } = Input;

type Props = {
  questionNumber: number;
  onAddQuestion: (questionData: IQuestion, isUpdate: boolean, questionNumber: number) => void;
  question?: IQuestion;
};

export const QuizComponent = ({ questionNumber, onAddQuestion, question }: Props) => {
  const [title, setTitle] = useState(question?.title);
  const [isChange, setIsChange] = useState(false);
  const [showAnswerInput, setShowAnswerInput] = useState(true);
  const [answers, setAnswers] = useState<{ id?: number; text: string; checked: boolean; isFixed: boolean }[]>(
    question?.answers?.map((a) => ({ id: a.id, text: a.answerText, checked: a.isCorrect, isFixed: a.isFixed })) || []
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { mutate: deleteQuestion, isPending: isLoading } = useDeleteQuestion();

  useEffect(() => {
    if (question) {
      setTitle(question?.title);
      setAnswers(
        question?.answers?.map((a) => ({ id: a.id, text: a.answerText, checked: a.isCorrect, isFixed: a.isFixed })) ||
          []
      );
    }
  }, [question]);

  useEffect(() => {
    addQuestion();
  }, [isChange]);

  const handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTitle(e.target.value);
    setIsChange(true);
  };

  const handleToggleAnswerInput = () => setShowAnswerInput(!showAnswerInput);

  const addAnswer = () => {
    setAnswers([...answers, { text: '', checked: false, isFixed: false }]);
    setIsChange(true);
  };

  const updateAnswerText = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
    setAnswers(newAnswers);
    setIsChange(true);
  };

  const removeAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
    setIsChange(true);
  };

  const handleRadioChange = (index: number) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      checked: i === index
    }));
    setAnswers(newAnswers);
    setIsChange(true);
  };

  const handleFixedAnswer = (index: number, isFixed: boolean) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      isFixed: i === index ? isFixed : answer.isFixed
    }));
    setAnswers(newAnswers);
    setIsChange(true);
  };

  const eachQuestionData: IQuestion = {
    id: question?.id,
    title,
    type: answers?.length > 0 ? 'MC' : 'Essay',
    lengthLimit: 2000,
    answers: answers.map((a) => ({
      id: a.id,
      answerText: a.text,
      isCorrect: a.checked,
      isFixed: a.isFixed
    }))
  };

  const addQuestion = () => {
    console.log('addQuestion');
    let isUpdate = false;

    if (question) {
      isUpdate = true;
    }

    onAddQuestion(eachQuestionData, isUpdate, questionNumber);
    if (!isUpdate) {
      // Reset state if necessary to allow for new question creation
      setTitle('');
      setAnswers([{ text: '', checked: false, isFixed: false }]);
      setShowAnswerInput(true);
    }

    setIsChange(false);
  };

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    if (question?.id) {
      deleteQuestion(String(question.id));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='mb-4'>
      <div className='border border-gray-300 rounded-lg mb-4 font-lexend'>
        <div
          className='flex justify-between p-3 rounded-t-lg cursor-pointer bg-[#f2f2f2]'
          onClick={handleToggleAnswerInput}
        >
          <div className='w-full'>
            <div>
              <span>
                Câu {questionNumber}: {!showAnswerInput && title}
              </span>
            </div>
          </div>
          {/* Icons */}
          <div className='flex items-center gap-4'>
            {showAnswerInput ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            {question && (
              <Tooltip title='Delete Question'>
                <Button type='text' icon={<Trash2 size={18} />} onClick={showDeleteModal} />
              </Tooltip>
            )}
          </div>
        </div>
        {showAnswerInput && (
          <div className='p-3'>
            <div className='flex gap-3 mb-4'>
              <div className='grow'>
                <TextArea
                  rows={4}
                  className='w-full p-3 bg-[#f2f2f2] rounded-lg resize-none mb-4 border-none text-gray-500 hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] text-base'
                  placeholder='Nội dung câu hỏi'
                  value={title}
                  onChange={handleTitleChange}
                />
                <div className='mt-2'>
                  <div className='flex border rounded-lg p-1'>
                    <Flex wrap>
                      <Tooltip title='Thêm câu trả lời'>
                        <Button onClick={addAnswer} type='text' icon={<Plus size={16} />} />
                      </Tooltip>
                    </Flex>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className='answer-list'>
                {answers.map((answer, index) => (
                  <div key={index} className='flex items-center gap-3 mb-2'>
                    <Radio
                      checked={answer.checked}
                      onChange={() => handleRadioChange(index)}
                      className='cursor-pointer'
                    />
                    <Input
                      size='large'
                      value={answer?.text}
                      onChange={(e) => updateAnswerText(index, e.target.value)}
                      placeholder='Nội dung câu trả lời'
                      className='grow rounded-[4px]'
                    />
                    <Checkbox checked={answer?.isFixed} onChange={(e) => handleFixedAnswer(index, e.target.checked)}>
                      Không đảo
                    </Checkbox>
                    <Button disabled={isLoading} icon={<X size={16} />} onClick={() => removeAnswer(index)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`flex justify-${question ? 'start' : 'start'}`}>
        {!question && (
          <Button type='default' onClick={addQuestion}>
            Thêm câu hỏi
          </Button>
        )}
      </div>
      <Modal
        title='Xóa câu hỏi'
        open={isModalVisible}
        okText='Xác nhận'
        cancelText='Hủy'
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn xóa câu hỏi này không?</p>
      </Modal>
    </div>
  );
};
