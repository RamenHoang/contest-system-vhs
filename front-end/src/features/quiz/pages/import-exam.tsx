import { useEffect, useState } from 'react';
import { Input, message, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { IAnswer, IQuestion } from '~/types';
import { ExamApi } from '~/api/exam-api';
import { Link } from 'react-router-dom';

const ImportExam = () => {
  const [importedData, setImportedData] = useState([]);
  const [openQuestions, setOpenQuestions] = useState(
    Array(importedData?.length).fill(false),
  );

  useEffect(() => {
    setOpenQuestions(Array(importedData?.length).fill(false));
  }, [importedData?.length]);

  const toggleQuestionVisibility = (index: number) => {
    setOpenQuestions((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const res = await ExamApi.importExam(file);
        if (res?.statusCode === 200) {
          message.success('File uploaded successfully');
          setImportedData(res?.data);
        }
      } catch (error) {
        message.error('Failed to upload file');
        console.error('File upload error:', error);
      }
    }
  };

  return (
    <div className='max-w-5xl mx-auto my-10'>
      <div className='flex items-center gap-2 bg-blue-100 rounded-md p-4 mb-4'>
        <span className='font-normal min-w-fit bg-blue-500 text-white px-4 py-2 rounded-md'>
          Tên đề thi
        </span>
        <Input
          size='large'
          value={'de thi thpt'}
          placeholder='Nhập tên bài thi'
        />
      </div>
      <div className='grid grid-cols-12 items-center w-full mx-auto border border-gray-300 border-dashed rounded-xl bg-gray-100 mb-5'>
        <label className='col-span-9 p-6 cursor-pointer'>
          <div className='flex justify-center items-center gap-2'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/10260/10260324.png'
              alt=''
              className='w-16'
            />
            <div className='text-center'>
              {' '}
              Kéo thả file docx để nhập đề nhanh tại đây{' '}
            </div>
            <input
              type='file'
              className='hidden'
              accept='.docx'
              onChange={handleFileChange}
            />
          </div>
        </label>
        <Link
          to='/upload/doc/de-thi-mau-myaloha.docx'
          className='col-span-3 p-6 border-l-gray-400 border-dashed'
        >
          <div className='flex justify-center items-center gap-2'>
            <img src='/image/dashboard/ic_download.svg' alt='' />
            <div className='text-center'>Tải file mẫu</div>
          </div>
        </Link>
      </div>
      {importedData.map((question: IQuestion, qIndex: number) => (
        <div key={qIndex} className='mb-4'>
          <div className='border border-gray-300 rounded-lg mb-4 font-lexend'>
            <div
              className='flex justify-between p-3 rounded-t-lg cursor-pointer bg-[#f2f2f2]'
              onClick={() => toggleQuestionVisibility(qIndex)}
            >
              <div className='w-full'>
                <div>
                  <span>
                    {!openQuestions[qIndex]
                      ? question.title
                      : 'Câu ' + (qIndex + 1)}
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <X size={18} />
                {openQuestions[qIndex] ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
            </div>
            {openQuestions[qIndex] && (
              <div className='p-3'>
                <TextArea
                  rows={4}
                  className='w-full p-3 bg-[#f2f2f2] rounded-lg resize-none mb-4 border-none text-gray-500 hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] text-base'
                  value={question.title}
                  readOnly
                />
                {question?.answers?.map((answer: IAnswer, aIndex: number) => (
                  <div key={aIndex} className='flex items-center gap-3 mb-2'>
                    <Radio
                      checked={answer.isCorrect}
                      className='cursor-pointer'
                    />
                    <Input
                      size='large'
                      value={answer.answerText}
                      placeholder='Nội dung câu trả lời'
                      className='grow rounded-[4px]'
                      readOnly
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImportExam;
