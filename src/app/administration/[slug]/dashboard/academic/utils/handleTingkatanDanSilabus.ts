import AcademicAPI from '@/api/academic';
import type { Subject, Syllabus, TingkatanDanSilabusInputData } from './types';

function getSubject(allSubject: Subject[], name: string) {
  return allSubject.find((subject) => subject.name === name);
}

function getSyllabus(
  allSyllabus: Syllabus[],
  data: {
    nama_mata_pelajaran: string;
    grade: string;
  }
) {
  return allSyllabus.find((syllabus) => {
    return (
      syllabus.subject_name === data.nama_mata_pelajaran &&
      syllabus.grade === data.grade
    );
  });
}

export default async function handleTingkatanDanSilabus(
  data: TingkatanDanSilabusInputData
) {
  // subjects
  const allSubject: Subject[] = (await AcademicAPI.getAllSubject()).data.data;
  const subjectNames = allSubject.map((subject) => subject.name);

  // syllabuses
  const allSyllabus: Syllabus[] = (await AcademicAPI.getAllSilabus()).data.data;

  const dataObject = data.map((row) => {
    return {
      nama_mata_pelajaran: row[0],
      grade: row[1],
      uri_silabus: row[2],
    };
  });

  const dataCreate = dataObject.filter((data) => {
    return (
      !allSyllabus.some(
        (syllabus) =>
          syllabus.subject_name === data.nama_mata_pelajaran &&
          syllabus.grade === data.grade
      ) && subjectNames.includes(data.nama_mata_pelajaran)
    );
  });

  const dataUpdate = dataObject.filter((data) => {
    return (
      allSyllabus.some(
        (syllabus) =>
          syllabus.subject_name === data.nama_mata_pelajaran &&
          syllabus.grade === data.grade
      ) && subjectNames.includes(data.nama_mata_pelajaran)
    );
  });

  const promisesCreate = dataCreate.map((data) => {
    const payload = {
      file_uri: data.uri_silabus,
      subject_id: getSubject(allSubject, data.nama_mata_pelajaran).id,
      grade: data.grade,
    };
    return AcademicAPI.createSilabus(payload);
  });

  const promisesUpdate = dataUpdate.map((data) => {
    const payload = {
      file_uri: data.uri_silabus,
      subject_id: getSubject(allSubject, data.nama_mata_pelajaran).id,
      grade: data.grade,
    };
    return AcademicAPI.updateSilabus(
      payload,
      getSyllabus(allSyllabus, data).id
    );
  });

  const res = await Promise.all([...promisesCreate, ...promisesUpdate]);
  const reportText = [];
  if (promisesCreate.length)
    reportText.push(
      `${promisesCreate.length} baris Tingkatan dan Silabus berhasil ditambahkan`
    );
  if (promisesUpdate.length)
    reportText.push(
      `${promisesUpdate.length} baris Tingkatan dan Silabus berhasil diperbarui`
    );
  return reportText.join(', ');
}
