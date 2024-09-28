import { useState, useEffect } from "react";
import {
  getAllClasses,
  getAllTasks,
  getStudentGroups,
} from "../repository/apiService";
import { getCookie } from "cookies-next";

export function useGetStudentTask() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const user = JSON.stringify(getCookie("userData"));

      const {
        data: studentGroups,
        success,
        message,
      } = await getStudentGroups();

      if (!success) {
        setError(message);
        setIsLoading(false);
        return;
      }

      const foundStudent = studentGroups.find(
        (student) => student.student_id === user.id
      );
      const studentGroupId = foundStudent.student_group_id;

      const {
        data: classes,
        success: classesResSuccess,
        message: classesResMessage,
      } = await getAllClasses();

      if (!classesResSuccess) {
        setError(classesResMessage);
        setIsLoading(false);
        return;
      }

      const classStudent = classes.filter(
        (studentClass) => studentClass.id == studentGroupId
      );

      const {
        data: tasks,
        success: tasksResSuccess,
        message: tasksResMessage,
      } = await getAllTasks();

      if (!tasksResSuccess) {
        setError(tasksResMessage);
        setIsLoading(false);
        return;
      }

      const filteredTask = tasks
        .map((task) => {
          const classData = classStudent.find((cls) => cls.id == task.class_id);
          if (classData) {
            return {
              subject_name: classData.study_program_name,
              teacher_name: classData.detail.homeroom_teacher_name,
              name: task.name,
              deadline: task.deadline,
            };
          }
          return null;
        })
        .filter((task) => task != null);

      setTasks(filteredTask);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    tasks,
    error,
    isLoading,
  };
}
