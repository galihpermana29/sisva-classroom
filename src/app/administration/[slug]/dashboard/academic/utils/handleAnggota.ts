import AcademicAPI from '@/api/academic';
import UsersAPI from '@/api/users';

import type {
  AnggotaInputData,
  Ekstrakulikuler,
  EkstrakulikulerStudent,
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

function getEkstrakulikuler(
  allEkstrakulikuler: Ekstrakulikuler[],
  name: string
) {
  return allEkstrakulikuler.find(
    (ekstrakulikuler) => ekstrakulikuler.name === name
  );
}

export default async function handleAnggota(data: AnggotaInputData) {
  // students
  const allStudent: User[] = (await UsersAPI.getAllUsers('student')).data.data;
  const studentNames = allStudent.map((student) => student.name);
  const studentUsernames = allStudent.map((student) => student.username);

  // ekstracurriculars
  const allEkstracurricular: Ekstrakulikuler[] = (
    await AcademicAPI.getAllExtra()
  ).data.data;
  const ekstracurricularNames = allEkstracurricular.map(
    (ekstracurricular) => ekstracurricular.name
  );

  // ekstracurricular students
  const allEkstrakulikulerStudent: EkstrakulikulerStudent[] = (
    await AcademicAPI.getAllExtraStudent()
  ).data.data;

  const dataObject = data
    .map((row) => {
      return {
        nama_ekstrakulikuler: row[0],
        nama_anggota: row[1],
        username_anggota: row[2],
      };
    })
    .filter((data) => {
      return (
        studentNames.includes(data.nama_anggota) &&
        (!data.username_anggota ||
          studentUsernames.includes(data.username_anggota)) &&
        ekstracurricularNames.includes(data.nama_ekstrakulikuler)
      );
    });

  const createObject = dataObject.filter(
    (data) =>
      !allEkstrakulikulerStudent.some((ekstrakulikulerStudent) => {
        const student = getUser(allStudent, {
          name: data.nama_anggota,
          username: data.username_anggota,
        });
        const ekstrakulikuler = getEkstrakulikuler(
          allEkstracurricular,
          data.nama_ekstrakulikuler
        );
        return (
          ekstrakulikulerStudent.student_id === student.id &&
          ekstrakulikulerStudent.extracurricular_id === ekstrakulikuler.id
        );
      })
  );

  const promisesCreate = createObject.map((data) => {
    const student = getUser(allStudent, {
      name: data.nama_anggota,
      username: data.username_anggota,
    });
    const ekstrakulikuler = getEkstrakulikuler(
      allEkstracurricular,
      data.nama_ekstrakulikuler
    );
    const payload = {
      student_id: student.id,
    };
    return AcademicAPI.createStudentInExtra(ekstrakulikuler.id, payload);
  });

  const res = await Promise.all(promisesCreate);
  const reportText = [];
  if (promisesCreate.length)
    reportText.push(
      `${promisesCreate.length} baris Anggota berhasil ditambahkan`
    );
  return reportText.join(', ');
}
