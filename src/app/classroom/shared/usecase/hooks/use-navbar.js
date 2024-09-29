import { Home05, User01, Users01 } from "@untitled-ui/icons-react";

export const useNavbar = (userType) => {
  const navItems = [
    { icon: Home05, label: "Beranda", path: `/classroom/${userType}` },
    { icon: Users01, label: "Kelas", path: `/classroom/${userType}/class` },
    { icon: User01, label: "Profil", path: `/classroom/${userType}/profile` },
  ];

  return {
    navItems,
  };
};
