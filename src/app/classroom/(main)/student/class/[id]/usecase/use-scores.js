import { useEffect, useState } from "react";
import {
  getScoreByClassId,
  getTaskById,
  getUserById,
} from "../repository/score-service";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import { useParams } from "next/navigation";

export function useGetScores() {
  const [scores, setScores] = useState({ data: [], userData: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { id } = params;
  const { id: student_id } = getClientSession();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const {
        data: scoresByClass,
        success: isSuccessScoresByClass,
        message: messageScoresByClass,
      } = await getScoreByClassId(id);

      if (!isSuccessScoresByClass || !Array.isArray(scoresByClass)) {
        console.error("Error fetching scores:", messageScoresByClass);
        setError(messageScoresByClass);
        setLoading(false);
        return;
      }

      const studentId = "8bd5ae22-10f6-4167-92be-740f02e1ed48";
      const studentScores = scoresByClass.filter(
        (score) => score.student_id === studentId
      );

      if (!studentScores.length) {
        setError("No scores found for this student.");
        setLoading(false);
        return;
      }

      function calculateAverage(scores, taskId) {
        const taskScores = scores
          .filter((score) => score.task_id === taskId)
          .map((score) => score.value);
        const total = taskScores.reduce((sum, value) => sum + value, 0);
        return taskScores.length ? total / taskScores.length : 0;
      }

      const { data: student } = await getUserById(studentId);

      const result = await Promise.all(
        studentScores.map(async (studentScore) => {
          const {
            data: task,
            success: isSuccessTask,
            message: messageTask,
          } = await getTaskById(studentScore.task_id);

          if (!isSuccessTask || !task) {
            console.error("Error fetching task:", messageTask);
            return null;
          }

          const averageScore = calculateAverage(
            scoresByClass,
            studentScore.task_id
          );

          return {
            student_score: studentScore.value,
            task_name: task.name,
            task_start_time: task.start_time,
            task_average: averageScore,
          };
        })
      );

      const filteredResults = result.filter((item) => item !== null);

      setScores({
        data: filteredResults,
        userData: {
          student_name: student.name,
          student_image: student.profile_image_uri,
        },
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    scores,
    loading,
    error,
  };
}
