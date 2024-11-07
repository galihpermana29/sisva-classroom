import ProfileContainer from "@/app/classroom/shared/view/Profile/ProfileContainer";
import { User01, UserSquare } from "@untitled-ui/icons-react";
import React from "react";

const TeacherProfileContainer = ({ initialData }) => {
  const profileMenus = [
    {
      icon: <User01 width={20} height={20} />,
      title: "Biodata",
      subtitle: "Informasi biodata akunmu",
      key: "biodata",
    },
    // {
    //   icon: <UserSquare width={20} height={20} />,
    //   title: "Akun",
    //   subtitle: "Buat perubahan akunmu",
    //   key: "akun",
    // },
  ];
  return (
    <ProfileContainer initialData={initialData} profileMenus={profileMenus} />
  );
};

export default TeacherProfileContainer;
