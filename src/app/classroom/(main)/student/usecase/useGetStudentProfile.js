import getUserCookie from "./getUserCookie";
import { getStudentGroups, getUserById } from "../repository/apiService";

export async function useGetStudentProfile() {
  const userData = getUserCookie();
  const studentGroups = await getStudentGroups();
  const foundStudent = studentGroups.find(
    (student) => student.student_id === userData.id
  );
  if (!foundStudent) {
    throw new Error("Students have not yet joined the class");
  }
  const studentData = await getUserById(foundStudent.student_id);
  return {
    student_name: foundStudent.student_name,
    student_group_name: foundStudent.student_group_name,
    student_image: studentData.profile_image_uri,
  };
}
