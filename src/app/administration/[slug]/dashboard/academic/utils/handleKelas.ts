import AcademicAPI from "@/api/academic";
import UsersAPI from "@/api/users";

import type { ClassType } from "@/globalcomponents/types";
import type {
  KelasInputData,
  Period,
  ProgramStudi,
  StudentGroup,
  User,
} from "./types";

function getUserByName(users: User[], name: string) {
  return users.find((user) => user.name === name);
}

function getUserByUsername(users: User[], username: string) {
  return users.find((user) => user.username === username);
}

function getUser(users: User[], user: { name: string; username: string }) {
  if (user.username) return getUserByUsername(users, user.username);
  return getUserByName(users, user.name);
}

function getPeriod(allPeriod: Period[], name: string) {
  return allPeriod.find((period) => period.name === name);
}

function getStudyProgram(allStudyProgram: ProgramStudi[], name: string) {
  return allStudyProgram.find((studyProgram) => studyProgram.name === name);
}

function getStudentGroup(
  allStudentGroup: StudentGroup[],
  name: string,
  periodId: string
) {
  return allStudentGroup.find(
    (studentGroup) =>
      studentGroup.name === name && studentGroup.period_id === periodId
  );
}

export default async function handleKelas(data: KelasInputData) {
  // teachers
  const allTeachers: User[] = (
    await UsersAPI.getAllUsers("teacher")
  ).data.data.filter((teacher: User) => teacher.status === "active");
  const teacherNames = allTeachers.map((teacher) => teacher.name);
  const teacherUsernames = allTeachers.map((teacher) => teacher.username);

  // periods
  const allPeriod: Period[] = (await AcademicAPI.getAllPeriod()).data.data;
  const periodNames = allPeriod.map((period) => period.name);

  // student groups
  const allStudentGroup: StudentGroup[] = (
    await AcademicAPI.getAllStudentGroup()
  ).data.data;

  // study programs
  const allStudyProgram: ProgramStudi[] = (await AcademicAPI.getAllProdi()).data
    .data;
  const studyProgramNames = allStudyProgram.map(
    (studyProgram) => studyProgram.name
  );

  const dataObject = data
    .map((row) => {
      return {
        nama_kelas: row[0],
        nama_wali_kelas: row[1],
        username_wali_kelas: row[2],
        nama_periode: row[3],
        nama_program_studi: row[4],
        grade: row[5],
      };
    })
    .filter((data) => {
      return (
        teacherNames.includes(data.nama_wali_kelas) &&
        (!data.username_wali_kelas ||
          teacherUsernames.includes(data.username_wali_kelas)) &&
        periodNames.includes(data.nama_periode) &&
        studyProgramNames.includes(data.nama_program_studi)
      );
    });

  const createObject = dataObject.filter(
    (data) =>
      !allStudentGroup.some(
        (studentGroup) =>
          studentGroup.name === data.nama_kelas &&
          studentGroup.period_id === getPeriod(allPeriod, data.nama_periode).id
      )
  );

  const updateObject = dataObject.filter((data) =>
    allStudentGroup.some(
      (studentGroup) =>
        studentGroup.name === data.nama_kelas &&
        studentGroup.period_id === getPeriod(allPeriod, data.nama_periode).id
    )
  );

  const promisesCreate = createObject.map((data) => {
    const teacher = getUser(allTeachers, {
      name: data.nama_wali_kelas,
      username: data.username_wali_kelas,
    });
    const period = getPeriod(allPeriod, data.nama_periode);
    const studyProgram = getStudyProgram(
      allStudyProgram,
      data.nama_program_studi
    );
    const classType: ClassType = "homeroom";
    const payload = {
      name: data.nama_kelas,
      type: classType,
      period_id: period.id,
      study_program_id: studyProgram.id,
      grade: data.grade,
      detail: {
        homeroom_teacher_id: teacher.id,
      },
    };
    return AcademicAPI.createStudentGroup(payload);
  });

  const promisesUpdate = updateObject.map((data) => {
    const teacher = getUser(allTeachers, {
      name: data.nama_wali_kelas,
      username: data.username_wali_kelas,
    });
    const period = getPeriod(allPeriod, data.nama_periode);
    const studentGroup = getStudentGroup(
      allStudentGroup,
      data.nama_kelas,
      period.id
    );
    const studyProgram = getStudyProgram(
      allStudyProgram,
      data.nama_program_studi
    );
    const payload = {
      name: data.nama_kelas,
      period_id: period.id,
      study_program_id: studyProgram.id,
      grade: data.grade,
      detail: {
        homeroom_teacher_id: teacher.id,
      },
    };
    return AcademicAPI.updateStudentGroup(studentGroup.id, payload);
  });

  const res = await Promise.all([...promisesCreate, ...promisesUpdate]);
  const reportText = [];
  if (promisesCreate.length)
    reportText.push(
      `${promisesCreate.length} baris Kelas berhasil ditambahkan`
    );
  if (promisesUpdate.length)
    reportText.push(`${promisesUpdate.length} baris Kelas berhasil diperbarui`);
  return reportText.join(", ");
}
