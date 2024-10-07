import React from "react";
import TeacherClassContainer from "./view/container/ClassContainer";
import {
  getPeriodDropdown,
  getTeacherClassList,
} from "./repository/teacher-class-service";
import { getAllStudyProgram } from "../teaching-material/repository/teaching-material-service";

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
