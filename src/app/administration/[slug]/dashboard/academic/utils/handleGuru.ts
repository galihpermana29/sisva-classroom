import AcademicAPI from "@/api/academic";
import UsersAPI from "@/api/users";

import type { GuruInputData, Subject, SubjectTeacher, User } from "./types";

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

function getSubject(allSubject: Subject[], name: string) {
  return allSubject.find((subject) => subject.name === name);
}

export default async function handleGuru(data: GuruInputData) {
  // teachers
  const allTeachers: User[] = (
    await UsersAPI.getAllUsers("teacher")
  ).data.data.filter((teacher: User) => teacher.status === "active");
  const teacherNames = allTeachers.map((teacher) => teacher.name);
  const teacherUsernames = allTeachers.map((teacher) => teacher.username);

  // subjects
  const allSubject: Subject[] = (await AcademicAPI.getAllSubject()).data.data;
  const subjectNames = allSubject.map((subject) => subject.name);

  // subject teacher
  const allSubjectTeacher: SubjectTeacher[] = (
    await AcademicAPI.getAllSubjectTeacher()
  ).data.data;

  const dataObject = data
    .map((row) => {
      return {
        name: row[0],
        username: row[1],
        nama_program_studi: row[2],
        grade: row[3],
      };
    })
    .filter((data) => {
      return (
        teacherNames.includes(data.name) &&
        (!data.username || teacherUsernames.includes(data.username)) &&
        subjectNames.includes(data.nama_program_studi)
      );
    });

  const createObject = dataObject.filter((data) => {
    const teacher = getUser(allTeachers, data);
    const subject = getSubject(allSubject, data.nama_program_studi);
    return !allSubjectTeacher.some(
      (subjectTeacher) =>
        subjectTeacher.teacher_id === teacher.id &&
        subjectTeacher.subject_id === subject.id &&
        subjectTeacher.grade === data.grade
    );
  });

  const promisesCreate = createObject.map((data) => {
    const teacher = getUser(allTeachers, data);
    const subject = getSubject(allSubject, data.nama_program_studi);
    const childs = allSubjectTeacher
      .filter(
        (subjectTeacher) =>
          subjectTeacher.teacher_id === teacher.id &&
          subjectTeacher.grade === data.grade
      )
      .map((subjectTeacher) => subjectTeacher.subject_id);
    childs.push(subject.id);
    const payload = {
      parent_type: "teacher",
      parent_id: teacher.id,
      grade: data.grade,
      childs: childs,
    };
    return AcademicAPI.replaceSubjectTeacher(payload);
  });

  const res = await Promise.all(promisesCreate);
  const reportText = [];
  if (promisesCreate.length)
    reportText.push(`${promisesCreate.length} baris Guru berhasil ditambahkan`);
  return reportText.join(", ");
}
