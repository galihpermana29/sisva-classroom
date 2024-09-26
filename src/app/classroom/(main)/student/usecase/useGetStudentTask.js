import { useState, useEffect } from "react";
import {
  getAllClasses,
  getAllTasks,
  getStudentGroups,
} from "../repository/student";

export function useGetStudentTask() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const studentGroups = await getStudentGroups();
        const foundStudent = studentGroups.find(
          (student) =>
            student.student_id === "5ffcd106-3e30-4e7d-bbbf-23c7bcd9a3a3"
        );
        const studentGroupId = foundStudent.student_group_id;

        const classes = await getAllClasses();

        const classStudent = classes.filter(
          (studentClass) => studentClass.id == studentGroupId
        );

        const tasks = await getAllTasks();

        const filteredTask = tasks
          .map((task) => {
            const classData = classStudent.find(
              (cls) => cls.id == task.class_id
            );
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

        return setTasks(filteredTask);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    tasks,
    error,
    isLoading,
  };
}
