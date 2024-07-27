import { useEffect, useState } from "react";
import { Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useExam } from "~/features/quiz/hooks/use-exam";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { IAnswer, IQuestion } from "~/types";

const EditExam = () => {
  const { data: exam } = useExam();

  const questions = exam?.data?.questions || [];
  const [openQuestions, setOpenQuestions] = useState(
    Array(questions?.length).fill(false),
  );

  useEffect(() => {
    setOpenQuestions(Array(questions?.length).fill(false));
  }, [questions?.length]);

  const toggleQuestionVisibility = (index: number) => {
    setOpenQuestions((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex items-center gap-2 bg-blue-100 rounded-md p-4 mb-4">
        <span className="font-normal min-w-fit bg-blue-500 text-white px-4 py-2 rounded-md">
          Tên đề thi
        </span>
        <Input
          size="large"
          value={exam?.data.title}
          placeholder="Nhập tên bài thi"
        />
      </div>
      {questions.map((question: IQuestion, qIndex: number) => (
        <div key={qIndex} className="mb-4">
          <div className="border border-gray-300 rounded-lg mb-4 font-lexend">
            <div
              className="flex justify-between p-3 rounded-t-lg cursor-pointer bg-[#f2f2f2]"
              onClick={() => toggleQuestionVisibility(qIndex)}
            >
              <div className="w-full">
                <div>
                  <span>
                    Câu {qIndex + 1}:{" "}
                    {!openQuestions[qIndex] && question?.title}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <X size={18} />
                {openQuestions[qIndex] ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
            </div>
            {openQuestions[qIndex] && (
              <div className="p-3">
                <TextArea
                  rows={4}
                  className="w-full p-3 bg-[#f2f2f2] rounded-lg resize-none mb-4 border-none text-gray-500 hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] text-base"
                  value={question.title}
                  readOnly
                />
                {question?.answers?.map((answer: IAnswer, aIndex: number) => (
                  <div key={aIndex} className="flex items-center gap-3 mb-2">
                    <Radio
                      checked={answer.isCorrect}
                      className="cursor-pointer"
                    />
                    <Input
                      size="large"
                      value={answer.answerText}
                      placeholder="Nội dung câu trả lời"
                      className="grow rounded-[4px]"
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

export default EditExam;
