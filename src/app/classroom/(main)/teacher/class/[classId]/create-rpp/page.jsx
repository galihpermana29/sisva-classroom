import React from "react";
import CreateRppMainPage from "./view/container/CreateRppMainPage";
import {
  getAllCurriculum,
  getAllStudyProgram,
  getAllSubjectName,
  getAllTeacher,
  getTeachingMaterialList,
} from "../../../teaching-material/repository/teaching-material-service";
import { getTeachingPlans } from "../Pane/TeachingPlan/repository/teaching-plan-service";

async function getCreateRppPageData() {
  const [
    teachingMaterialList,
    teachingPlanData,
    curriculumDropdown,
    studyProgramDropdown,
    subjectDropdown,
    teacherDropdown,
  ] = await Promise.all([
    getTeachingMaterialList(),
    getTeachingPlans(),
    getAllCurriculum(),
    getAllStudyProgram(),
    getAllSubjectName(),
    getAllTeacher(),
  ]);

  return {
    teachingMaterialList: teachingMaterialList.data ?? [],
    teachingPlanData: teachingPlanData.data ?? [],
    curriculumDropdown: curriculumDropdown.data ?? [],
    studyProgramDropdown: studyProgramDropdown.data ?? [],
    subjectDropdown: subjectDropdown.data ?? [],
    teacherDropdown: teacherDropdown.data ?? [],
  };
}
const CreateRppPage = async () => {
  const initialData = await getCreateRppPageData();

  return <CreateRppMainPage initialData={initialData} />;
};

export default CreateRppPage;
