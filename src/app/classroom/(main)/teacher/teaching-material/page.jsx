import React from "react";
import TeachingMaterialContainer from "./view/container/TeachingMaterialContainer";
import {
  getTeachingMaterialList,
  getAllCurriculum,
  getAllStudyProgram,
  getAllSubjectName,
  getAllTeacher,
} from "./repository/teaching-material-service";
import { resturctureTeachingMaterialList } from "./model/data-mapper";

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
  return <TeachingMaterialContainer initialData={initialData} />;
};

export default TeachingMaterialPage;
