import AcademicAPI from '@/api/academic';
import UsersAPI from '@/api/users';

import type { Ekstrakulikuler, EkstrakulikulerInputData, User } from './types';

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

export default async function handleEkstrakulikuler(
  data: EkstrakulikulerInputData
) {
  // teachers
  const allTeachers: User[] = (
    await UsersAPI.getAllUsers('teacher')
  ).data.data.filter((teacher: User) => teacher.status === 'active');
  const teacherNames = allTeachers.map((teacher) => teacher.name);
  const teacherUsernames = allTeachers.map((teacher) => teacher.username);

  // ekstracurriculars
  const allEkstracurricular: Ekstrakulikuler[] = (
    await AcademicAPI.getAllExtra()
  ).data.data;
  const ekstracurricularNames = allEkstracurricular.map(
    (ekstracurricular) => ekstracurricular.name
  );

  const dataObject = data
    .map((row) => {
      return {
        name_ekstrakulikuler: row[0],
        nama_pembina: row[1],
        username_pembina: row[2],
      };
    })
    .filter(
      (data) =>
        teacherNames.includes(data.nama_pembina) ||
        teacherUsernames.includes(data.username_pembina)
    );

  const createObject = dataObject.filter(
    (data) => !ekstracurricularNames.includes(data.name_ekstrakulikuler)
  );

  const updateObject = dataObject.filter((data) =>
    ekstracurricularNames.includes(data.name_ekstrakulikuler)
  );

  const promisesCreate = createObject.map((data) => {
    const teacher = getUser(allTeachers, {
      name: data.nama_pembina,
      username: data.username_pembina,
    });
    const payload = {
      name: data.name_ekstrakulikuler,
      teacher_id: teacher.id,
    };

    return AcademicAPI.createExtra(payload);
  });

  const promisesUpdate = updateObject.map((data) => {
    const teacher = getUser(allTeachers, {
      name: data.nama_pembina,
      username: data.username_pembina,
    });
    const payload = {
      name: data.name_ekstrakulikuler,
      teacher_id: teacher.id,
    };

    return AcademicAPI.updateExtra(
      getEkstrakulikuler(allEkstracurricular, data.name_ekstrakulikuler).id,
      payload
    );
  });

  const res = await Promise.all([...promisesCreate, ...promisesUpdate]);
  const reportText = [];
  if (promisesCreate.length)
    reportText.push(
      `${promisesCreate.length} baris Ekstrakulikuler berhasil ditambahkan`
    );
  if (promisesUpdate.length)
    reportText.push(
      `${promisesUpdate.length} baris Ekstrakulikuler berhasil diperbarui`
    );
  return reportText.join(', ');
}
