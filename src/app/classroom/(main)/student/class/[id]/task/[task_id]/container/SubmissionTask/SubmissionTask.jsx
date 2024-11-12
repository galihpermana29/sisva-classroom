import { useState } from "react";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import { SisvaTextArea } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import { Form } from "antd";
import { useSubmission } from "../../usecase/use-submission";
import { useGetSubmission } from "../../usecase/use-get-submission";
import SkeletonSubmissionTask from "../Skeleton/SkeletonSubmissionTask";
import CardFile from "../Card/CardFile";
import InputFile from "../InputFile/InputFile";

const SubmissionTask = ({ allowSubmission, allowOverdueSubmission }) => {
  const [fileList, setFileList] = useState(null);
  const { name } = getClientSession();
  const { submission, loading } = useGetSubmission();

  const {
    loading: loadingSubmission,
    handleUploadFile,
    handleSubmitSubmission,
    form,
    fileUrl,
  } = useSubmission(submission.attachment_file_uri);

  if (loading) {
    return <SkeletonSubmissionTask />;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-card my-6">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-base font-semibold text-[#333333]">{name}</h3>
        {submission.value && (
          <span className="text-base90 text-sm font-semibold">
            {submission.value}
          </span>
        )}
      </div>
      <p className="text-sm text-base60">
        {submission.value ? "Dinilai" : "Ditugaskan"}
      </p>
      <Form
        form={form}
        name="form-submission"
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmitSubmission}
        className="font-kumbh mt-4"
        disabled={allowOverdueSubmission || allowSubmission}
      >
        <Form.Item name="file">
          {!submission.value && (
            <InputFile
              onFileSelect={handleUploadFile}
              fileList={fileList}
              setFileList={setFileList}
            />
          )}
          {(fileUrl || submission.attachment_file_uri) && (
            <div className="mt-3">
              <CardFile file_name={fileUrl || submission.attachment_file_uri} />
            </div>
          )}
        </Form.Item>
        {submission.value ? (
          <div>
            <h4 className="text-base font-semibold text-base90 mb-2">
              Private Comment
            </h4>
            <p className="text-sm text-base60">{submission.feedback}</p>
          </div>
        ) : (
          <div>
            <h4 className="text-base font-semibold text-base90 mb-2">
              Catatan
            </h4>
            <Form.Item name="feedback" initialValue={submission.note}>
              <SisvaTextArea
                placeholder="Tulis catatan disini"
                rows={5}
                customClassName="font-kumbh p-3"
                disabled={allowOverdueSubmission || allowSubmission}
              />
            </Form.Item>
          </div>
        )}

        {!submission.value && (
          <div>
            <SisvaButton
              htmlType="submit"
              className="font-kumbh"
              loading={loadingSubmission}
              disabled={allowOverdueSubmission || allowSubmission}
            >
              {submission.attachment_file_uri ? "Edit Tugas" : "Submit Tugas"}
            </SisvaButton>
          </div>
        )}
      </Form>
    </div>
  );
};

export default SubmissionTask;
