import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getScoreByClassId,
  getTaskById,
  getUserById,
} from "../../repository/teacher-score-service";

export function useGetScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { classId } = params;

  useEffect(() => {
    const fetchData = async () => {
      const scoreByClass = await getScoreByClassId(classId);

      if (!scoreByClass.success || !Array.isArray(scoreByClass)) {
        setError(scoreByClass.message);
        setLoading(false);
      }

      const getStudentProfile = async (id) => {
        const { data: student } = await getUserById(id);
        return {
          name: student.name,
          image: student.profile_image_uri,
          id: student.id,
        };
      };

      const getTaskDetail = async (id) => {
        const { data: task } = await getTaskById(id);
        return {
          task_name: task.name,
          task_date: task.start_time,
        };
      };

      const scoreClass = await Promise.all(
        scoreByClass.data.map(async (score) => {
          const studentProfile = await getStudentProfile(score.student_id);
          const taskDetail = await getTaskDetail(score.task_id);

          return {
            task_id: score.task_id,
            student_id: studentProfile.id,
            student_name: studentProfile.name,
            student_image: studentProfile.image,
            task_name: taskDetail.task_name,
            task_date: taskDetail.task_date,
            task_score: score.value,
          };
        })
      );
      setScores(scoreClass);
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
