import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import {
  getAllClasses,
  getAllTasks,
  getStudentGroups,
  getUserById,
} from "../repository/apiService";

export function useGetClassReviews() {
  const [classReviews, setClassReviews] = useState([]);
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

      const getTeacherProfileImage = async (teacherId) => {
        const { data: profile } = await getUserById(teacherId);
        return profile.profile_image_uri;
      };

      const classReviews = await Promise.all(
        tasks.map(async (task) => {
          const classData = classStudent.find((cls) => cls.id == task.class_id);
          if (classData) {
            const profileImageUri = await getTeacherProfileImage(
              classData.teacher_id
            );
            return {
              subject_name: classData.subject_name,
              class_name: classData.student_group_name,
              teacher_name: classData.teacher_name,
              name: task.name,
              deadline: task.deadline,
              profile_uri: profileImageUri,
            };
          }
          return null;
        })
      );

      setClassReviews(
        classReviews
          .filter((cls) => cls != null)
          .filter((task) => {
            const [day, month, yearAndTime] = task.deadline.split("/");
            const [year, time] = yearAndTime.split(" ");
            const deadline = `${month}/${day}/${year} ${time}`;
            return new Date(deadline) > new Date();
          })
      );
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    classReviews,
    isLoading,
    error,
  };
}
