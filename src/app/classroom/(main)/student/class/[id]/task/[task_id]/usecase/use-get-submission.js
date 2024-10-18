import { useEffect, useState } from "react";
import {
  getScoreByTaskId,
  getSubmissionByTaskId,
} from "../repository/task-submission-repository";
import { useParams } from "next/navigation";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";

export function useGetSubmission() {
  const [submission, setSubmission] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { task_id } = params;
  const { id: student_id } = getClientSession();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: submissions,
        message,
        success: successSubmission,
      } = await getSubmissionByTaskId(task_id);
      if (!successSubmission) {
        setLoading(false);
      }
      const { data: scores, success: successScore } = await getScoreByTaskId(
        task_id
      );
      if (!successScore) {
        setLoading(false);
      }

      const submissionStudent = submissions.find(
        (sbm) => sbm.student_id == student_id
      );
      const scoreStudent = scores.find(
        (score) => score.student_id == student_id
      );

      if (!scoreStudent) {
        setSubmission({
          ...submissionStudent,
          value: null,
        });
        setLoading(false);
      }

      setSubmission({
        ...submissionStudent,
        ...scoreStudent,
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    loading,
    submission,
  };
}
