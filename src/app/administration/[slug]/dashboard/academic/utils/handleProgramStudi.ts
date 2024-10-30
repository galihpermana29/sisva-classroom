import AcademicAPI from '@/api/academic';
import type {
  Grade,
  ProgramStudi,
  ProgramStudiInputData,
  ProgramStudiStatus,
} from './types';

function getGrade(checkmark: boolean, grade: Grade): Grade | null {
  if (checkmark) return grade;
  return null;
}

function getProgramStudiId(allProgramStudi: ProgramStudi[], name: string) {
  return allProgramStudi.find((programStudi) => programStudi.name === name).id;
}
export default async function handleProgramStudi(data: ProgramStudiInputData) {
  const allProgramStudi: ProgramStudi[] = await (
    await AcademicAPI.getAllProdi()
  ).data.data;
  const programStudiNames = allProgramStudi.map(
    (programStudi) => programStudi.name
  );
  const dataObject = data.map((row) => {
    return {
      name: row[0],
      code: row[1],
      grade: [
        getGrade(row[2], 'I'),
        getGrade(row[3], 'II'),
        getGrade(row[4], 'III'),
        getGrade(row[5], 'IV'),
        getGrade(row[6], 'V'),
        getGrade(row[7], 'VI'),
        getGrade(row[8], 'VII'),
        getGrade(row[9], 'VIII'),
        getGrade(row[10], 'IX'),
        getGrade(row[11], 'X'),
        getGrade(row[12], 'XI'),
        getGrade(row[13], 'XII'),
      ].filter((grade) => grade),
    };
  });

  const dataCreate = dataObject.filter(
    (programStudi) => !programStudiNames.includes(programStudi.name)
  );
  const dataUpdate = dataObject.filter((programStudi) =>
    programStudiNames.includes(programStudi.name)
  );

  const promisesCreate = dataCreate.map((data) => {
    const status: ProgramStudiStatus = 'active';
    const payload = {
      name: data.name,
      code: data.code,
      grades: data.grade,
      status: status,
    };
    return AcademicAPI.createProdi(payload);
  });

  const promisesUpdate = dataUpdate.map((data) => {
    const payload = {
      name: data.name,
      code: data.code,
      grades: data.grade,
    };
    return AcademicAPI.updateProdi(
      payload,
      getProgramStudiId(allProgramStudi, data.name)
    );
  });

  const res = await Promise.all([...promisesCreate, ...promisesUpdate]);
}
