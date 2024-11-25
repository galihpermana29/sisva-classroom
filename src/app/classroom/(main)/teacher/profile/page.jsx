import React from "react";

import { getProfileDetail } from "@/app/classroom/shared/repository/profile-detail-service";
import { getServerSession } from "@/app/classroom/shared/usecase/session/get-server-session";

import TeacherProfileContainer from "./view/container/TeacherProfileContainer";

async function getTeacherProfilePageData() {
  const { id } = await getServerSession();
  const response = await getProfileDetail(id);

  return response.success ? response.data : null;
}

const TeacherProfilePage = async () => {
  const initialData = await getTeacherProfilePageData();
  return <TeacherProfileContainer initialData={initialData} />;
};

export default TeacherProfilePage;
