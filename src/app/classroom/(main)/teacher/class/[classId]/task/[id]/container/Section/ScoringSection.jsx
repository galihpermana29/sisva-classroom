import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import {
    SisvaInputNumber,
    SisvaTextArea,
} from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import { Form } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { dateFormatterHours } from "../../usecase/dateFormatter";
import { isOverdue } from "../../usecase/use-overdue";
import { useSetScore } from "../../usecase/use-set-score";
import { useSubmission } from "../../usecase/use-submission";
import CardFile from "../Card/CardFile";
import EmptyStateStudentScore from "../EmptyState/EmptyState";
import SkeletonScoringSection from "../Skeleton/SkeletonScoringSection";

const ScoringSection = ({ deadline }) => {
  const { submission, loading } = useSubmission();
  const { form, handleSetScore, loading: loadingSetScore } = useSetScore();
  const searchParams = useSearchParams();
  const student_id = searchParams.get("student_id");

  useEffect(() => {
    if (submission) {
      form.setFieldsValue({
        score: submission.score,
        feedback: submission.feedback,
      });
    }
  }, [submission, form, student_id]);

  if (loading) {
    return <SkeletonScoringSection />;
  }

  if (!student_id) {
    return (
      <div className="p-4 w-full">
        <div className="lg:h-[500px] flex justify-center items-center">
          <div className="">
            <EmptyState
              title="Belum Memilih Siswa"
              description="Silakan pilih siswa yang ingin dinilai dari daftar siswa. Pastikan untuk memilih siswa sebelum melanjutkan."
            />
          </div>
        </div>
      </div>
    );
  }

  if (!submission.is_submitted) {
    return <EmptyStateStudentScore student_name={submission.student_name} />;
  }

  return (
    <div className="p-4 w-full flex flex-col gap-4 ">
      <div>
        <h3 className="text-base font-sembold text-[#333333] mt-10">
          {submission.student_name}
        </h3>
        <p className="text-sm text-base90 mt-2">
          Dikumpulkan
          <span> {dateFormatterHours(submission.submission_time)} </span>
          <span>
            {isOverdue(deadline, submission.submission_time) ? (
              <strong>(Overdue)</strong>
            ) : null}
          </span>
        </p>
      </div>

      <CardFile file_name={submission.attachment_file_uri} file_type="PDF" />

      <div
        style={{
          borderBottom: "solid 1px #D0D5DD",
        }}
      >
        <h4 className="text-base font-semibold text-base90">Catatan</h4>
        <p className="text-sm text-base60 my-4">{submission.note}</p>
      </div>
      <Form
        name="form-score"
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleSetScore}
        disabled={loadingSetScore}
        className="font-kumbh "
      >
        <div>
          <h4 className="text-base font-semibold text-base90 mb-2">Nilai</h4>
          <Form.Item
            name="score"
            initialValue={submission.score}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <SisvaInputNumber min={0} max={100} customSize="md" />
          </Form.Item>
        </div>
        <div>
          <h4 className="text-base font-semibold text-base90 mb-2">Komentar</h4>
          <Form.Item name="feedback">
            <SisvaTextArea
              placeholder="Tulis komentar disini"
              rows={5}
              customClassName="font-kumbh p-3"
            />
          </Form.Item>
        </div>
        <div>
          <SisvaButton
            htmlType="submit"
            className="font-kumbh"
            disabled={loadingSetScore}
          >
            Submit Nilai
          </SisvaButton>
        </div>
      </Form>
    </div>
  );
};

export default ScoringSection;
