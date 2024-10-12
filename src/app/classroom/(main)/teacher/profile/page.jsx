import React from "react";
import TeacherProfileContainer from "./view/container/TeacherProfileContainer";
import { getServerSession } from "@/app/classroom/shared/usecase/session/get-server-session";

async function getTeacherProfilePageData() {
  const data = await getServerSession();
  return data;
}

const TeacherProfilePage = async () => {
  const initialData = await getTeacherProfilePageData();
  return <TeacherProfileContainer initialData={initialData} />;
};

export default TeacherProfilePage;
