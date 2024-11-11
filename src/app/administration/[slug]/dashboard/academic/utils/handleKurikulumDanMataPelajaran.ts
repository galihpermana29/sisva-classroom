import AcademicAPI from "@/api/academic";
import type { SubjectTypeText } from "@/globalcomponents/types";
import { getSubjectType } from "@/globalcomponents/types";
import { onlyUnique } from "@/utils/onlyUnique";
import type {
  Curriculum,
  KurikulumDanMataPelajaranInputData,
  ProgramStudi,
  Subject,
} from "./types";

function getCurriculum(allCurriculum: Curriculum[], name: string) {
  return allCurriculum.find((curriculum) => curriculum.name === name);
}

function getProgramStudi(allProgramStudi: ProgramStudi[], name: string) {
  return allProgramStudi.find((programStudi) => programStudi.name === name);
}

function getSubject(allSubject: Subject[], name: string) {
  return allSubject.find((subject) => subject.name === name);
}

export default async function handleKurikulumDanMataPelajaran(
  data: KurikulumDanMataPelajaranInputData
) {
  // curriculums
  let allCurriculum: Curriculum[] = (await AcademicAPI.getAllCurriculum()).data
    .data;
  let curriculumNames = allCurriculum.map((curriculum) => curriculum.name);

  // study programs
  const allStudyProgram: ProgramStudi[] = (await AcademicAPI.getAllProdi()).data
    .data;
  const studyProgramNames = allStudyProgram.map(
    (studyProgram) => studyProgram.name
  );

  // subjects
  const allSubject: Subject[] = (await AcademicAPI.getAllSubject()).data.data;
  const subjectNames = allSubject.map((subject) => subject.name);

  const dataObject = data.map((row) => {
    return {
      nama_kurikulum: row[0],
      nama_program_studi: row[1],
      nama_mata_pelajaran: row[2],
      subject_type: getSubjectType(row[3] as SubjectTypeText),
    };
  });

  const createCurriculumNameArray = dataObject
    .filter((data) => !curriculumNames.includes(data.nama_kurikulum))
    .map((data) => data.nama_kurikulum)
    .filter(onlyUnique);

  const promisesCreateCurriculum = createCurriculumNameArray.map((name) => {
    const payload = {
      name: name,
    };
    return AcademicAPI.createCurriculum(payload);
  });

  // create curriculum and re-fetch all curriculum
  await Promise.all(promisesCreateCurriculum);
  allCurriculum = (await AcademicAPI.getAllCurriculum()).data.data;
  curriculumNames = allCurriculum.map((curriculum) => curriculum.name);

  const createSubjectObject = dataObject.filter(
    (data) =>
      !subjectNames.includes(data.nama_mata_pelajaran) &&
      curriculumNames.includes(data.nama_kurikulum) &&
      studyProgramNames.includes(data.nama_program_studi)
  );

  const updateSubjectObject = dataObject.filter(
    (data) =>
      subjectNames.includes(data.nama_mata_pelajaran) &&
      curriculumNames.includes(data.nama_kurikulum) &&
      studyProgramNames.includes(data.nama_program_studi)
  );

  const promisesCreateSubject = createSubjectObject.map((data) => {
    const payload = {
      name: data.nama_mata_pelajaran,
      type: data.subject_type,
      study_program_id: getProgramStudi(
        allStudyProgram,
        data.nama_program_studi
      ).id,
      curriculum_id: getCurriculum(allCurriculum, data.nama_kurikulum).id,
    };
    return AcademicAPI.createSubject(payload);
  });

  const promisesUpdateSubject = updateSubjectObject.map((data) => {
    const payload = {
      name: data.nama_mata_pelajaran,
      type: data.subject_type,
      study_program_id: getProgramStudi(
        allStudyProgram,
        data.nama_program_studi
      ).id,
      curriculum_id: getCurriculum(allCurriculum, data.nama_kurikulum).id,
    };
    return AcademicAPI.updateSubject(
      payload,
      getSubject(allSubject, data.nama_mata_pelajaran).id
    );
  });

  const res = await Promise.all([
    ...promisesCreateSubject,
    ...promisesUpdateSubject,
  ]);
  const reportText = [];
  if (promisesCreateSubject.length)
    reportText.push(
      `${promisesCreateSubject.length} baris Kurikulum dan Mata Pelajaran berhasil ditambahkan`
    );
  if (promisesUpdateSubject.length)
    reportText.push(
      `${promisesUpdateSubject.length} baris Kurikulum dan Mata Pelajaran berhasil diperbarui`
    );
  return reportText.join(", ");
}
