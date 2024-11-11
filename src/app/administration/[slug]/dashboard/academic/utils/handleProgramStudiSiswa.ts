import AcademicAPI from "@/api/academic";
import UsersAPI from "@/api/users";

import type { ProgramStudi, ProgramStudiSiswaInputData, User } from "./types";

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

function getProgramStudi(allProgramStudi: ProgramStudi[], name: string) {
  return allProgramStudi.find((programStudi) => programStudi.name === name);
}

export default async function handleProgramStudiSiswa(
  data: ProgramStudiSiswaInputData
) {
  // active students
  const students: User[] = (await UsersAPI.getAllUsers("student")).data.data;
  const activeStundents = students.filter(
    (stundent) => stundent.status === "active"
  );
  const studentNames = activeStundents.map((student) => student.name);
  const studentUsernames = activeStundents.map((student) => student.username);

  // study programs
  const allProgramStudi: ProgramStudi[] = await (
    await AcademicAPI.getAllProdi()
  ).data.data;
  const programStudiNames = allProgramStudi.map(
    (programStudi) => programStudi.name
  );

  const dataObject = data.map((row) => {
    return {
      name: row[0],
      username: row[1],
      nama_program_studi: row[2],
      grade: row[3],
    };
  });

  const updateObject = dataObject.filter(
    (data) =>
      studentNames.includes(data.name) &&
      (!data.username || studentUsernames.includes(data.username)) &&
      programStudiNames.includes(data.nama_program_studi)
  );

  const promisesUpdate = updateObject.map((data) => {
    const student = getUser(activeStundents, data);
    const programStudi = getProgramStudi(
      allProgramStudi,
      data.nama_program_studi
    );

    const json_text_object = JSON.parse(student.detail.json_text);
    json_text_object.study_program_id = programStudi.id;
    json_text_object.study_program = programStudi.name;

    const payload = {
      detail: {
        grade: data.grade,
        json_text: JSON.stringify(json_text_object),
      },
    };

    return UsersAPI.updateUserById(payload, student.id);
  });

  const res = await Promise.all(promisesUpdate);
  const reportText = [];
  if (promisesUpdate.length)
    reportText.push(
      `${promisesUpdate.length} baris Program Studi Siswa berhasil diperbarui`
    );
  return reportText.join(", ");
}
