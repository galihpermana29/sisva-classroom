import React from "react";
import TeacherClassContainer from "./view/container/ClassContainer";
import {
  getPeriodDropdown,
  getTeacherClassList,
} from "./repository/teacher-class-service";

async function getTeacherClassListPageData() {
  const [classList, periodList] = await Promise.all([
    getTeacherClassList(),
    getPeriodDropdown(),
  ]);

  return {
    teacherClass: classList.data ?? [],
    periodData: periodList.data ?? [],
  };
}
const TeacherClassPage = async () => {
  const initialData = await getTeacherClassListPageData();

  return <TeacherClassContainer initialData={initialData} />;
};

export default TeacherClassPage;
