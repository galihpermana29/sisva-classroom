import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import { Form } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    setSubmissionTask,
    uploadFile,
} from "../repository/task-submission-repository";

export function useSubmission() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const params = useParams();

  const { id: student_id } = getClientSession();
  const { task_id } = params;

  const handleUploadFile = async (file) => {
    if (!file) {
      setFileUrl(null);
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await uploadFile(formData);

    if (response.success) {
      toast.success("Success upload file");
      setFileUrl(response.data);
    } else {
      toast.error("Error upload file");
    }
    setLoading(false);
  };

  const handleSubmitSubmission = async (value) => {
    setLoading(true);
    if (!fileUrl) {
      toast.error("Failed send submission file submission is empty");
      setLoading(false);
      return;
    }
    const submissionPayload = {
      student_id: student_id,
      attachment_file_uri: fileUrl,
      note: value.feedback,
    };

    const res = await setSubmissionTask(submissionPayload, task_id);
    if (res.success) {
      setLoading(false);
      toast.success("Success send your submission");
    } else {
      setLoading(false);
      toast.error("Failed send your submission");
    }
  };

  return {
    loading,
    handleUploadFile,
    handleSubmitSubmission,
    form,
  };
}
