import React from "react";
import {
  getTeachingMaterialList,
  getAllCurriculum,
  getAllStudyProgram,
  getAllSubjectName,
  getAllTeacher,
} from "./repository/teaching-material-service";
import TeachingMaterialMainPage from "./view/container/TeachingMaterialMainPage";

async function getTeachingMaterialPageData() {
  const [
    teachingMaterialList,
    curriculumDropdown,
    studyProgramDropdown,
    subjectDropdown,
    teacherDropdown,
  ] = await Promise.all([
    getTeachingMaterialList(),
    getAllCurriculum(),
    getAllStudyProgram(),
    getAllSubjectName(),
    getAllTeacher(),
  ]);

  return {
    teachingMaterialList: teachingMaterialList.data ?? [],
    curriculumDropdown: curriculumDropdown.data ?? [],
    studyProgramDropdown: studyProgramDropdown.data ?? [],
    subjectDropdown: subjectDropdown.data ?? [],
    teacherDropdown: teacherDropdown.data ?? [],
  };
}

const TeachingMaterialPage = async () => {
  const initialData = await getTeachingMaterialPageData();
  return <TeachingMaterialMainPage initialData={initialData} />;
};

export default TeachingMaterialPage;
