import ProfileContainer from "@/app/classroom/shared/view/Profile/ProfileContainer";
import { Lock01, User01, Users03, UserSquare } from "@untitled-ui/icons-react";
import React from "react";

const StudentProfileContainer = ({ initialData }) => {
  const profileMenus = [
    {
      icon: <User01 width={20} height={20} />,
      title: "Biodata",
      subtitle: "Informasi biodata akunmu",
      key: "biodata",
    },
    {
      icon: <UserSquare width={20} height={20} />,
      title: "Akun",
      subtitle: "Buat perubahan akunmu",
      key: "akun",
    },
    {
      icon: <Users03 width={20} height={20} />,
      title: "Wali Murid",
      subtitle: "Informasi wali muridmu",
      key: "wali-murid",
    },
    {
      icon: <Lock01 width={20} height={20} />,
      title: "Keamanan",
      subtitle: "Pengaturan password akunmu",
      key: "password",
    },
  ];

  return (
    <ProfileContainer initialData={initialData} profileMenus={profileMenus} />
  );
};

export default StudentProfileContainer;
