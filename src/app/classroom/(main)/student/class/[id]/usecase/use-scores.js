import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getAllTasks,
  getScoreByClassId,
  getTaskById,
} from "../repository/score-service";
import { parseDateTimeSort } from "./dateFormatter";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import { useCalculateAverage } from "./use-average";

export function useGetScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id: student_id } = getClientSession();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scoreByClass = await getScoreByClassId(id);

        if (!scoreByClass.success || !Array.isArray(scoreByClass.data)) {
          setError(scoreByClass.message || "Error fetching scores");
          setLoading(false);
          return;
        }

        const getTaskDetail = async (id) => {
          const { data: task } = await getTaskById(id);
          return {
            task_name: task.name,
            task_date: task.start_time,
          };
        };

        const tasks = await getAllTasks();
        if (!tasks.success || !Array.isArray(tasks.data)) {
          setError(tasks.message || "Error fetching tasks");
          setLoading(false);
          return;
        }

        const classTask = tasks.data
          .filter((task) => task.class_id == id)
          .sort((a, b) => {
            const dateA = parseDateTimeSort(a.start_time);
            const dateB = parseDateTimeSort(b.start_time);
            return dateB - dateA;
          });

        const scoreStudent = await Promise.all(
          classTask.map(async (task) => {
            const studentScore = scoreByClass.data.find(
              (score) =>
                score.student_id == student_id && score.task_id == task.id
            );

            const averageScore = useCalculateAverage(
              scoreByClass.data,
              task.id
            );

            return {
              task_name: task.name,
              task_start_time: task.start_time,
              student_score: studentScore ? studentScore.value : 0,
              task_average: averageScore,
            };
          })
        );

        setScores(scoreStudent);
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return {
    scores,
    loading,
    error,
  };
}
