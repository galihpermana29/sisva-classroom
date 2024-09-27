import {
  getAllClasses,
  getAllClassSchedules,
  getStudentGroups,
} from "../repository/apiService";
import getUserCookie from "./getUserCookie";

export async function useGetStudentSchedule() {
  const userData = getUserCookie();

  const studentsGroup = await getStudentGroups();
  const foundStudent = studentsGroup.find(
    (student) => student.student_id === userData.id
  );
  const studentGroupId = foundStudent.student_group_id;

  const classes = await getAllClasses();

  const classStudent = classes.filter(
    (studentClass) => studentClass.student_group_id == studentGroupId
  );

  const schedules = await getAllClassSchedules();

  const filteredSchedule = classStudent.map((cls) => {
    const schedule = schedules.filter((sch) => sch.class_id === cls.id);
    return schedule;
  });

  return filteredSchedule;
}
