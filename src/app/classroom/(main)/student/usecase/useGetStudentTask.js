import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

import { isBefore } from "@/app/classroom/shared/usecase/helper";

import {
  getAllClasses,
  getAllTasks,
  getStudentGroups,
} from "../repository/apiService";

export function useGetStudentTask() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(getCookie("userData"));

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

      if (!classesResSuccess || !Array.isArray(classes)) {
        setError(classesResMessage);
        setIsLoading(false);
        return;
      }

      const classStudent = classes.filter(
        (studentClass) => studentClass.student_group_id == studentGroupId
      );

      const {
        data: tasks,
        success: tasksResSuccess,
        message: tasksResMessage,
      } = await getAllTasks();

      if (!tasksResSuccess || !Array.isArray(tasks)) {
        setError(tasksResMessage);
        setIsLoading(false);
        return;
      }

      const filteredTask = tasks
        .map((task) => {
          const classData = classStudent.find((cls) => cls.id == task.class_id);
          if (classData) {
            return {
              task_id: task.id,
              class_id: classData.id,
              subject_name: classData.subject_name,
              teacher_name: classData.teacher_name,
              name: task.name,
              deadline: task.deadline,
            };
          }
          return null;
        })
        .filter((task) => task != null)
        .filter((task) => {
          const [day, month, yearAndTime] = task.deadline.split("/");
          const [year, time] = yearAndTime.split(" ");
          const deadline = `${month}/${day}/${year} ${time}`;
          return new Date(deadline) > new Date();
        });

      filteredTask.sort((a, b) => {
        return isBefore(a.deadline, b.deadline) ? -1 : 1;
      });

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
