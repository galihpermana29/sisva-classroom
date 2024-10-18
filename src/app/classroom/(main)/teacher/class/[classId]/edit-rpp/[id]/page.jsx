import React from "react";
import { getRppById } from "./repository/edit-rpp-service";
import {
  getAllCurriculum,
  getAllStudyProgram,
  getAllSubjectName,
  getAllTeacher,
  getTeachingMaterialList,
} from "../../../../teaching-material/repository/teaching-material-service";
import CreateRppMainPage from "../../create-rpp/view/container/CreateRppMainPage";
import { getAllTaskList } from "../../../repository/teacher-class-service";
import { notFound } from "next/navigation";
import { getTeachingPlans } from "../../Pane/TeachingPlan/repository/teaching-plan-service";

async function getEditRppPageData(id) {
  const [
    initialFormData,
    teachingMaterialList,
    teachingPlanData,
    taskList,
    curriculumDropdown,
    studyProgramDropdown,
    subjectDropdown,
    teacherDropdown,
  ] = await Promise.all([
    getRppById(id),
    getTeachingMaterialList(),
    getTeachingPlans(),
    getAllTaskList(),
    getAllCurriculum(),
    getAllStudyProgram(),
    getAllSubjectName(),
    getAllTeacher(),
  ]);

  if (!initialFormData.success) {
    notFound();
  }

  return {
    initialFormData: initialFormData.data ?? {},
    teachingMaterialList: teachingMaterialList.data ?? [],
    teachingPlanData: teachingPlanData.data ?? [],
    taskList: taskList.data ?? [],
    curriculumDropdown: curriculumDropdown.data ?? [],
    studyProgramDropdown: studyProgramDropdown.data ?? [],
    subjectDropdown: subjectDropdown.data ?? [],
    teacherDropdown: teacherDropdown.data ?? [],
  };
}
const EditRppPage = async ({ params }) => {
  const { id } = params;
  const initialData = await getEditRppPageData(id);

  return (
    <CreateRppMainPage
      initialData={initialData}
      headerText="Edit Rencana Pembelajaran Kelas:"
    />
  );
};

export default EditRppPage;
