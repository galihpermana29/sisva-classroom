import type { Grade, ProgramStudiData } from './types';

function getGrade(checkmark: boolean, grade: Grade): Grade | null {
  if (checkmark) return grade;
  return null;
}

export default function handleProgramStudiXLSX(data: ProgramStudiData) {
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
  console.log(dataObject);
}
