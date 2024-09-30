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
        console.log(classesResMessage);
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

      const getTeacherProfileImage = async (teacherId) => {
        const { data: profile } = await getUserById(teacherId);
        return profile.data.profile_image_uri;
      };

      const classReviews = await Promise.all(
        tasks.map(async (task) => {
          const classData = classStudent.find((cls) => cls.id == task.class_id);
          if (classData) {
            const profileImageUri = await getTeacherProfileImage(
              classData.detail.homeroom_teacher_id
            );

            return {
              subject_name: classData.study_program_name,
              class_name: classData.name,
              teacher_name: classData.detail.homeroom_teacher_name,
              name: task.name,
              deadline: task.deadline,
              profile_uri: profileImageUri,
            };
          }
          return null;
        })
      );

      setClassReviews(classReviews.filter((cls) => cls != null));
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
