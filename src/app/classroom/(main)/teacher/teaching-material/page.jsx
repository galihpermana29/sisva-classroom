import React from "react";
import {
  getTeachingMaterialList,
  getAllCurriculum,
  getAllStudyProgram,
  getAllSubjectName,
  getAllTeacher,
} from "./repository/teaching-material-service";
import TeachingMaterialMainPage from "./view/container/TeachingMaterialMainPage";
import { getTeachingPlans } from "../class/[classId]/Pane/TeachingPlan/repository/teaching-plan-service";

async function getTeachingMaterialPageData() {
  const [
    teachingPlanData,
    teachingMaterialList,
    curriculumDropdown,
    studyProgramDropdown,
    subjectDropdown,
    teacherDropdown,
  ] = await Promise.all([
    getTeachingPlans(),
    getTeachingMaterialList(),
    getAllCurriculum(),
    getAllStudyProgram(),
    getAllSubjectName(),
    getAllTeacher(),
  ]);

  return {
    teachingPlanData: teachingPlanData.data ?? [],
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
