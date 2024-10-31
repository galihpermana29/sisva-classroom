import AcademicAPI from '@/api/academic';
import UsersAPI from '@/api/users';

import type { GuruInputData, Subject, SubjectTeacher, User } from './types';

function getUserByName(students: User[], name: string) {
  return students.find((student) => student.name === name);
}

function getUserByUsername(students: User[], username: string) {
  return students.find((student) => student.username === username);
}

function getUser(
  students: User[],
  student: { name: string; username: string }
) {
  if (student.username) return getUserByUsername(students, student.username);
  return getUserByName(students, student.name);
}

function getSubject(allSubject: Subject[], name: string) {
  return allSubject.find((subject) => subject.name === name);
}

export default async function handleGuru(data: GuruInputData) {
  // teachers
  const allTeachers: User[] = (
    await UsersAPI.getAllUsers('teacher')
  ).data.data.filter((teacher: User) => teacher.status === 'active');
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
        (teacherNames.includes(data.name) ||
          teacherUsernames.includes(data.username)) &&
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
    const payload = {
      parent_type: 'teacher',
      parent_id: teacher.id,
      grade: data.grade,
      childs: [subject.id],
    };
    return AcademicAPI.replaceSubjectTeacher(payload);
  });

  const res = await Promise.all(promisesCreate);
}
