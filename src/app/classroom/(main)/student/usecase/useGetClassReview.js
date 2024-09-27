import {
  getAllClasses,
  getAllTasks,
  getStudentGroups,
} from "../repository/apiService";
import getUserCookie from "./getUserCookie";

export async function useGetClassReviews() {
  const userData = getUserCookie();

  const studentGroups = await getStudentGroups();
  const foundStudent = studentGroups.find(
    (student) => student.student_id === userData.id
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
  return classReviews.filter((cls) => cls != null);
}
