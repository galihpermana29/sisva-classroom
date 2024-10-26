import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    getAllClasses,
    getAllTasks,
    getScoreByClassId,
    getStudentGroups,
    getTaskById,
    getUserById,
} from "../../repository/teacher-score-service";
import { parseDateTimeSort } from "../dateFormatter";

export function useGetScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { classId } = params;

  useEffect(() => {
    const fetchData = async () => {
      const studentsGroup = await getStudentGroups();
      if (!studentsGroup.success || !Array.isArray(studentsGroup.data)) {
        setError(studentsGroup.message);
        setLoading(false);
      }

      const classes = await getAllClasses();
      if (!classes.success || !Array.isArray(classes.data)) {
        setError(getAllClasses.message);
        setLoading(false);
      }

      const classesStudent = classes.data.filter((cls) => cls.id == classId);

      const studentClass = studentsGroup.data.filter(
        (student) =>
          student.student_group_id == classesStudent[0].student_group_id
      );

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

      const tasks = await getAllTasks();
      if (!tasks.success) {
        setLoading(false);
        setError(tasks.message);
      }
      const classTask = tasks.data
        .filter((task) => task.class_id == classId)
        .sort((a, b) => {
          const dateA = parseDateTimeSort(a.start_time);
          const dateB = parseDateTimeSort(b.start_time);
          return dateA - dateB;
        });
      const scoreClass = await Promise.all(
        studentClass.map(async (student) => {
          const studentProfile = await getStudentProfile(student.student_id);

          return Promise.all(
            classTask.map(async (task) => {
              const taskDetail = await getTaskDetail(task.id);
              const studentScore = scoreByClass.data.find(
                (score) =>
                  score.student_id === student.student_id &&
                  score.task_id === task.id
              );

              return {
                task_id: task.id,
                student_id: studentProfile.id,
                student_name: studentProfile.name,
                student_image: studentProfile.image,
                task_name: taskDetail.task_name,
                task_date: taskDetail.task_date,
                task_score: studentScore ? studentScore.value : null,
              };
            })
          );
        })
      );

      setScores(scoreClass.flat());
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
