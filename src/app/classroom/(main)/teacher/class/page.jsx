import React from "react";
import { getAllStudyProgram } from "../teaching-material/repository/teaching-material-service";
import {
    getPeriodDropdown,
    getTeacherClassList,
} from "./repository/teacher-class-service";
import TeacherClassContainer from "./view/container/ClassContainer";

async function getTeacherClassListPageData() {
  const [classList, periodList, studyProgramList] = await Promise.all([
    getTeacherClassList(),
    getPeriodDropdown(),
    getAllStudyProgram(),
  ]);

  return {
    teacherClass: classList.data ?? [],
    periodData: periodList.data ?? [],
    studyProgramList: studyProgramList.data ?? [],
  };
}
const TeacherClassPage = async () => {
  const initialData = await getTeacherClassListPageData();

  return <TeacherClassContainer initialData={initialData} />;
};

export default TeacherClassPage;
