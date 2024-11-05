import AcademicAPI from '@/api/academic';
import UsersAPI from '@/api/users';

import type {
  MuridInputData,
  StudentGroup,
  StudentGroupStudent,
  User,
} from './types';

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

function getStudentGroup(allStudentGroup: StudentGroup[], name: string) {
  return allStudentGroup.find((studentGroup) => studentGroup.name === name);
}

export default async function handleMurid(data: MuridInputData) {
  // students
  const allStudent: User[] = (await UsersAPI.getAllUsers('student')).data.data;
  const studentNames = allStudent.map((student) => student.name);
  const studentUsernames = allStudent.map((student) => student.username);

  // student groups
  const allStudentGroup: StudentGroup[] = (
    await AcademicAPI.getAllStudentGroup()
  ).data.data;
  const studentGroupNames = allStudentGroup.map(
    (studentGroup) => studentGroup.name
  );

  // student group students
  const allStudentGroupStudent: StudentGroupStudent[] = (
    await AcademicAPI.getAllStudentInGroup()
  ).data.data;

  const dataObject = data
    .map((row) => {
      return {
        nama_kelas: row[0],
        nama_siswa: row[1],
        username_siswa: row[2],
      };
    })
    .filter((data) => {
      return (
        (studentNames.includes(data.nama_siswa) ||
          studentUsernames.includes(data.username_siswa)) &&
        studentGroupNames.includes(data.nama_kelas)
      );
    });

  const createObject = dataObject.filter(
    (data) =>
      !allStudentGroupStudent.some((studentGroupStudent) => {
        const student = getUser(allStudent, {
          name: data.nama_siswa,
          username: data.username_siswa,
        });
        return studentGroupStudent.student_id === student.id;
      })
  );

  const promisesCreate = createObject.map((data) => {
    const student = getUser(allStudent, {
      name: data.nama_siswa,
      username: data.username_siswa,
    });
    const studentGroup = getStudentGroup(allStudentGroup, data.nama_kelas);
    const payload = {
      student_id: student.id,
    };
    return AcademicAPI.insertStudentToStudentGroup(studentGroup.id, payload);
  });

  const res = await Promise.all(promisesCreate);
  const reportText = [];
  if (promisesCreate.length)
    reportText.push(
      `${promisesCreate.length} baris Murid berhasil ditambahkan`
    );
  return reportText.join(', ');
}
