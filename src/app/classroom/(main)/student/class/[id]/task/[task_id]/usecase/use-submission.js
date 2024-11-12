import { useEffect, useState } from "react";
import {
  setSubmissionTask,
  uploadFile,
} from "../repository/task-submission-repository";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import toast from "react-hot-toast";
import { Form } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useClassAssignment } from "../../../Pane/Assignments/usecase/hooks/use-class-assignment";

export function useSubmission() {
  const { refetch } = useClassAssignment();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const params = useParams();
  const router = useRouter();

  const { id: student_id } = getClientSession();
  const { id: class_id, task_id } = params;

  useEffect(() => {
    const storedFileUrl = localStorage.getItem("submissionFileUrl");
    if (storedFileUrl) {
      setFileUrl(storedFileUrl);
    }
  }, []);

  const handleUploadFile = async (file) => {
    if (!file) {
      setFileUrl("");
      localStorage.removeItem("submissionFileUrl");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await uploadFile(formData);

    if (response.success) {
      toast.success("Success upload file");
      setFileUrl(response.data);
      localStorage.setItem("submissionFileUrl", response.data);
    } else {
      toast.error("Error upload file");
    }
    setLoading(false);
  };

  const handleSubmitSubmission = async (value) => {
    setLoading(true);
    if (!fileUrl) {
      toast.error("Failed send submission, file submission is empty");
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
      localStorage.removeItem("submissionFileUrl");
      router.push(`/classroom/student/class/${class_id}?tab=tugas`);
      toast.success("Success send your submission");
      refetch();
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
