import AcademicAPI from '@/api/academic';

import type {
  Curriculum,
  Period,
  PeriodCurriculum,
  PeriodeDanKurikulumInputData,
  ProgramStudi,
} from './types';

function getCurriculum(allCurriculum: Curriculum[], name: string) {
  return allCurriculum.find((curriculum) => curriculum.name === name);
}

function getProgramStudi(allProgramStudi: ProgramStudi[], name: string) {
  return allProgramStudi.find((programStudi) => programStudi.name === name);
}

function getPeriod(allPeriod: Period[], name: string) {
  return allPeriod.find((period) => period.name === name);
}

export default async function handlePeriodeDanKurikulum(
  data: PeriodeDanKurikulumInputData
) {
  // periods
  const allPeriod: Period[] = (await AcademicAPI.getAllPeriod()).data.data;
  const periodNames = allPeriod.map((period) => period.name);

  // periods curriculums
  const allPeriodCurriculum: PeriodCurriculum[] = (
    await AcademicAPI.getPeriodCurr()
  ).data.data;

  // curriculums
  const allCurriculum: Curriculum[] = (await AcademicAPI.getAllCurriculum())
    .data.data;
  const curriculumNames = allCurriculum.map((curriculum) => curriculum.name);

  // study programs
  const allStudyProgram: ProgramStudi[] = (await AcademicAPI.getAllProdi()).data
    .data;
  const studyProgramNames = allStudyProgram.map(
    (studyProgram) => studyProgram.name
  );

  const dataObject = data.map((row) => {
    return {
      nama_periode: row[0],
      nama_kurikulum: row[1],
      nama_program_studi: row[2],
      grade: row[3],
    };
  });

  const createObject = dataObject.filter((data) => {
    return (
      !allPeriodCurriculum.some(
        (periodCurriculum) =>
          periodCurriculum.period_name === data.nama_periode &&
          periodCurriculum.curriculum_name === data.nama_kurikulum &&
          periodCurriculum.study_program_name === data.nama_program_studi &&
          periodCurriculum.grade === data.grade
      ) &&
      periodNames.includes(data.nama_periode) &&
      curriculumNames.includes(data.nama_kurikulum) &&
      studyProgramNames.includes(data.nama_program_studi)
    );
  });

  const promisesCreate = createObject.map((data) => {
    const period_id = getPeriod(allPeriod, data.nama_periode).id;
    const payload = {
      study_program_id: getProgramStudi(
        allStudyProgram,
        data.nama_program_studi
      ).id,
      curriculum_id: getCurriculum(allCurriculum, data.nama_kurikulum).id,
      grade: data.grade,
    };
    return AcademicAPI.addCurriculumInPeriod(period_id, payload);
  });

  const res = await Promise.all(promisesCreate);
  const reportText = [];
  if (promisesCreate.length)
    reportText.push(
      `${promisesCreate.length} baris Periode dan Kurikulum berhasil ditambahkan`
    );
  return reportText.join(', ');
}
