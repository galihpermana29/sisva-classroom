import { useEffect, useState } from "react";
import {
  getStudentScores,
  getSubmissionTask,
  getUserById,
} from "../repository/scoring-submission-service";
import { useParams, useSearchParams } from "next/navigation";

export function useSubmission() {
  const [submission, setSubmission] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params;
  const searchParams = useSearchParams();
  const student_id = searchParams.get("student_id");

  useEffect(() => {
    const fetchData = async () => {
      if (!student_id) {
        setLoading(false);
        setSubmission({ student_name: "", is_submitted: false });
        return;
      }

      const {
        data: submissions,
        success,
        message,
      } = await getSubmissionTask(id);

      if (!success || !Array.isArray(submissions)) {
        setLoading(false);
        setError(message);
      }

      const {
        data: scores,
        success: scoresSuccess,
        message: scoresMessage,
      } = await getStudentScores(id);

      if (!scoresSuccess || !Array.isArray(scores)) {
        setLoading(false);
        setError(scoresMessage);
      }

      const { data: profile } = await getUserById(student_id);

      const studentSubmission = submissions.find(
        (submission) => submission.student_id == student_id
      );

      if (!studentSubmission) {
        setLoading(false);
        setSubmission({ student_name: profile.name, is_submitted: false });
        return;
      }

      const studentScore = scores.find(
        (score) => score.student_id == student_id
      );

      if (studentScore) {
        setSubmission({
          student_name: profile.name,
          attachment_file_uri: studentSubmission.attachment_file_uri,
          note: studentSubmission.note,
          submission_time: studentSubmission.submission_time,
          score: studentScore.value,
          feedback: studentScore.feedback,
          is_submitted: true,
        });
        return;
      }
      setSubmission({
        student_name: profile.name,
        attachment_file_uri: studentSubmission.attachment_file_uri,
        note: studentSubmission.note,
        submission_time: studentSubmission.submission_time,
        score: 0,
        feedback: "",
        is_submitted: true,
      });

      setLoading(false);
    };
    fetchData();
  }, [student_id]);
  return {
    submission,
    loading,
    error,
  };
}
