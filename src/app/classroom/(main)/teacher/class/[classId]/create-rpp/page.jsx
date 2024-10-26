import React from "react";
import {
    getAllCurriculum,
    getAllStudyProgram,
    getAllSubjectName,
    getAllTeacher,
    getTeachingMaterialList,
} from "../../../teaching-material/repository/teaching-material-service";
import CreateRppMainPage from "./view/container/CreateRppMainPage";

async function getCreateRppPageData() {
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
const CreateRppPage = async () => {
  const initialData = await getCreateRppPageData();

  return <CreateRppMainPage initialData={initialData} />;
};

export default CreateRppPage;
