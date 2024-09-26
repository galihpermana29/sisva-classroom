import { useEffect, useState } from "react";
import { getAllClasses, getStudentGroups } from "../repository/student";

export const useGetClassReviews = () => {
  const [classReviews, setClassReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentGroups = await getStudentGroups();
        const foundStudent = studentGroups.find(
          (student) =>
            student.student_id === "5ffcd106-3e30-4e7d-bbbf-23c7bcd9a3a3"
        );
        const studentGroupId = foundStudent.student_group_id;

        const classes = await getAllClasses();

        const classStudent = classes.find(
          (studentClass) => studentClass.id == studentGroupId
        );

        const tasks = await getAllTasks();

        const getTeacherProfileImage = async (teacherId) => {
          const profile = await getProfile(teacherId);
          return profile.data.profile_image_uri;
        };

        const classReviews = await Promise.all(
          tasks.map(async (task) => {
            const classData = classStudent.find(
              (cls) => cls.id == task.class_id
            );
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
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { classReviews, error, isLoading };
};
