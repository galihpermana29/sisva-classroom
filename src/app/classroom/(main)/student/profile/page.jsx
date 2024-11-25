import React from "react";

import { getProfileDetail } from "@/app/classroom/shared/repository/profile-detail-service";
import { getServerSession } from "@/app/classroom/shared/usecase/session/get-server-session";

import StudentProfileContainer from "./view/container/StudentProfileContainer";

async function getStudentProfilePageData() {
  const { id } = await getServerSession();
  const response = await getProfileDetail(id);

  return response.success ? response.data : null;
}

const StudentProfilePage = async () => {
  const initialData = await getStudentProfilePageData();
  return <StudentProfileContainer initialData={initialData} />;
};

export default StudentProfilePage;
