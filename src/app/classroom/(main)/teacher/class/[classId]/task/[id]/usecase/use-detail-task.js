import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";

import { getTaskById } from "../repository/scoring-submission-service";

export function useDetailTask() {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const teacherInfo = getClientSession();
  const router = useRouter();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: taskData,
        success: successTaskId,
        message: messageTaskId,
      } = await getTaskById(id);

      if (!successTaskId) {
        setLoading(false);
        setError(messageTaskId);
        router.back();
      }

      setTask({
        task_name: taskData.name,
        task_deadline: taskData.deadline,
        task_allow_submission: taskData.allow_submission,
        teacher_name: teacherInfo.name,
        task_description: taskData.description,
        task_file: taskData.attachment_file_uri,
      });
      setLoading(false);
    };
    fetchData();
  }, []);
  return {
    task,
    error,
    loading,
  };
}
