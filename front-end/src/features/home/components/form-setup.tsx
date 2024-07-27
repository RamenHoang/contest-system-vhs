import { Button, Form, Input, Select } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInfoStep2 } from "~/features/competition/hooks/use-info-step2";
import { useSetupCompetition } from "~/features/home/hooks/use-setup-competition";
import { useExams } from "~/features/quiz/hooks/use-exams";
import { IExam, IInfoStep2, ISetupCompetition } from '~/types';

export const FormSetup = () => {
  const navigate = useNavigate();
  const { data: exams } = useExams();

  const { id } = useParams();

  const [examIds, setExamIds] = useState<number[]>([]);

  const { data: infoStep2Data } = useInfoStep2();
  const infoStep2: IInfoStep2 = infoStep2Data?.data;

  console.log(infoStep2);
  const totalQuestion = infoStep2?.examOfCompetitions?.reduce(
    (acc, curr) => acc + curr.totalEssayQuestion + curr.totalMCQuestion,
    0
  );

  const [form] = Form.useForm<ISetupCompetition>();

  const { mutate: setUpCompetition } = useSetupCompetition();

  const options = exams?.data.map((data: IExam) => ({
    value: data?.id,
    label: data?.title,
  }));

  const handleSubmit = (data: ISetupCompetition) => {
    const finalData = {
      ...data,
      id: parseInt(id as string),
      testDuration: Number(data.testDuration),
      testAttempts: Number(data.testAttempts),
      isMix: data.isMix === 'null' ? null : data.isMix,
      examOfCompetitions: examIds.map((id) => ({ examBankingId: id })),
      numberOfQuestion: Number(data.numberOfQuestion)
    };

    // @ts-expect-error null
    setUpCompetition(finalData, {
      onSuccess: () => {
        navigate(`/dashboard/contest/${id}/edit?step=3`);
      },
    });
  };

  useEffect(() => {
    if (!infoStep2 || isEmpty(infoStep2)) {
      return;
    }

    const { testDuration, testAttempts, isMix, examOfCompetitions, numberOfQuestion } = infoStep2;

    const selectedExamIds = examOfCompetitions?.map((exam) => exam.examBankingId) || [];
    setExamIds(selectedExamIds);

    form.setFieldsValue({
      testDuration,
      testAttempts,
      // @ts-expect-error null
      isMix: isMix === null ? "null" : isMix,
      selectedExamIds,
      numberOfQuestion
    });
  }, [infoStep2, form]);

  return (
    <div className="-mt-10">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label='Trộn nhiều đề thi' name='selectedExamIds'>
          <Select
            mode="multiple"
            onChange={(selectedItems) => {
              const selectedIds = selectedItems.map((item: number) => Number(item));
              setExamIds(selectedIds);
            }}
            style={{ width: "100%" }}
            options={options}
          />
        </Form.Item>
        <Form.Item
          label="Thời gian làm bài (phút) (0: Không giới hạn)"
          name="testDuration"
        >
          <Input placeholder="Thời gian làm bài" type="number" />
        </Form.Item>
        <Form.Item
          label="Số lần làm bài (0: Không giới hạn)"
          name="testAttempts"
        >
          <Input placeholder="Số lần làm bài.." type="number" />
        </Form.Item>
        <Form.Item name="isMix" label="Trộn câu hỏi">
          <Select
            showSearch
            defaultValue={{ value: "null", label: "Không trộn" }}
            placeholder="Chọn hình thức trộn"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "null", label: "Không trộn" },
              { value: "question", label: "Chỉ trộn câu hỏi" },
              {
                value: "question-answer",
                label: "Trộn câu hỏi và câu trả lời",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={`Số câu hỏi / ${totalQuestion} câu`} name='numberOfQuestion' required>
          <Input placeholder='Số câu hỏi' type='number' min={0} max={totalQuestion} defaultValue={0} required />
        </Form.Item>
        <div className='mt-5 mb-2 flex justify-end gap-3'>
          <Button size='middle' htmlType='submit' type='primary'>
            Xác nhận
          </Button>
        </div>
      </Form>
    </div>
  );
};
