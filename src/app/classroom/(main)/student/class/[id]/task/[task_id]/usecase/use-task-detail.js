import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getAllClasses,
  getStudentGroups,
  getTaskById,
} from "../repository/task-submission-repository";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";

export function useTask() {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const params = useParams();
  const { task_id } = params;
  const { id: student_id } = getClientSession();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: studentGroups,
        success: successStudentGroups,
        message: messageStudentGroups,
      } = await getStudentGroups();

      if (!successStudentGroups || !Array.isArray(studentGroups)) {
        setLoading(false);
        setError(messageStudentGroups);
      }

      const foundStudentGroup = studentGroups.find(
        (student) => student.student_id == student_id
      );

      const {
        data: classes,
        success: successClasses,
        message: messageClasses,
      } = await getAllClasses();

      if (!successClasses || !Array.isArray(classes)) {
        setLoading(false);
        setError(messageClasses);
      }

      const classStudent = classes.find(
        (cls) => cls.student_group_id == foundStudentGroup.student_group_id
      );

      const {
        data: taskData,
        success: successTaskId,
        message: messageTaskId,
      } = await getTaskById(task_id);

      if (!successTaskId) {
        setLoading(false);
        setError(messageTaskId);
        router.back();
      }

      setTask({
        task_name: taskData.name,
        task_deadline: taskData.deadline,
        task_allow_submission: taskData.allow_submission,
        task_allow_overdue_submission: taskData.allow_overdue_submission,
        teacher_name: classStudent.teacher_name,
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
