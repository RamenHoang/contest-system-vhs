import { useEffect, useState } from 'react';
import { Input, message, Button } from 'antd';
import { IQuestion } from '~/types';
import { ExamApi } from '~/api/exam-api';
import { Link } from 'react-router-dom';
import { QuizComponent } from '~/features/quiz/components/quiz';
import { useCreateOrUpdateQuestion } from '~/features/quiz/hooks/use-create-update-question';
import { useExam } from '~/features/quiz/hooks/use-exam';
import { useUpdateExam } from '~/features/quiz/hooks/use-update-exam';
import { QuizMComponent } from '~/features/quiz/components/quiz_mc';

const CreateExam = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const { mutate: createOrUpdateQuestion } = useCreateOrUpdateQuestion();
  const { mutate: updateExam } = useUpdateExam();
  const { data: exam } = useExam();

  useEffect(() => {
    if (exam?.data?.title) {
      setTitle(exam.data.title);
      setQuestions(exam.data.questions || []);
    }
  }, [exam?.data?.title, exam?.data?.questions]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const res = await ExamApi.importExam(file);
        if (res?.statusCode === 200) {
          message.success('File uploaded successfully');
          setQuestions(res?.data); // Directly set imported questions to questions state
        }
      } catch (error) {
        message.error('Failed to upload file');
        console.error('File upload error:', error);
      }
    }
  };

  const handleAddQuestion = (questionData: IQuestion, isUpdate: boolean, questionNumber: number) => {
    if (Array.isArray(questionData)) {
      console.error('questionData should be an object, not an array');
    } else {
      setQuestions((prevQuestions: IQuestion[]) => {
        let updatedQuestions;
        if (isUpdate) {
          // Update the existing question
          updatedQuestions = prevQuestions.map((q, index) =>
            (q.id && q.id === questionData.id) || index + 1 === questionNumber ? questionData : q
          );
        } else {
          // Add new question
          updatedQuestions = [...prevQuestions, questionData];
        }
        return updatedQuestions;
      });
    }
  };

  const handleSubmitQuestion = () => {
    // Directly pass questions array to createOrUpdateQuestion
    createOrUpdateQuestion(questions);
  };

  const handleUpdateExamHeader = () => {
    const examHeaderData = {
      title,
      totalMCQuestion: questions.length,
      totalEssayQuestion: 0
    };
    updateExam(examHeaderData);

    handleSubmitQuestion();
  };

  return (
    <div className='my-5 mx-10'>
      <div className='text-[#757575] uppercase text-[23px] leading-[29px] font-semibold mb-4'>Tạo bài thi</div>
      <div className='flex items-center gap-2 bg-blue-100 rounded-md p-4 mb-4'>
        <span className='font-normal min-w-fit bg-blue-500 text-white px-4 py-2 rounded-md'>Tên đề thi</span>
        <Input
          size='large'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Nhập tên bài thi trong trang create-exam'
        />
        <Button type='primary' className='font-normal text-[15px] px-4 py-2' onClick={handleUpdateExamHeader}>
          Cập nhật đề thi
        </Button>
      </div>
      <div className='grid grid-cols-12 items-center w-full mx-auto border border-gray-300 border-dashed rounded-xl bg-gray-100 mb-5'>
        <label className='col-span-9 p-6 cursor-pointer'>
          <div className='flex justify-center items-center gap-2'>
            <img src='https://cdn-icons-png.flaticon.com/512/10260/10260324.png' alt='' className='w-16' />
            <div className='text-center'>Chọn file docx để nhập đề nhanh tại đây</div>
            <input type='file' className='hidden' accept='.docx' onChange={handleFileChange} />
          </div>
        </label>
        <Link
          to='/public/upload/doc/de-thi-mau.docx'
          className='col-span-3 p-6 border-l-gray-400 border-dashed'
          download={true}
          target='_blank'
        >
          <div className='flex justify-center items-center gap-2'>
            <img src='/image/dashboard/ic_download.svg' alt='' />
            <div className='text-center'>Tải file mẫu</div>
          </div>
        </Link>
      </div>
      {questions.map((question, index) => (
        <QuizComponent key={index} questionNumber={index + 1} onAddQuestion={handleAddQuestion} question={question} />
      ))}
      <QuizMComponent questionNumber={questions.length + 1} onAddQuestion={handleAddQuestion} />
      {/* <Button type='primary' className='font-medium text-[15px] mt-5 p-4' onClick={handleSubmitQuestion}>
        Lưu bộ câu hỏi
      </Button> */}
    </div>
  );
};

export default CreateExam;
