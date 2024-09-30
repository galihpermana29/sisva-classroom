import { Home05, User01, Users01 } from "@untitled-ui/icons-react";
import { usePathname } from "next/navigation";

export const useNavbar = (userType) => {
  const pathname = usePathname();
  const navItems = [
    {
      icon: Home05,
      label: "Beranda",
      path: `/classroom/${userType}`,
      isActive: pathname === `/classroom/${userType}`,
    },
    {
      icon: Users01,
      label: "Kelas",
      path: `/classroom/${userType}/class`,
      isActive: pathname.startsWith(`/classroom/${userType}/class`),
    },
    {
      icon: User01,
      label: "Profil",
      path: `/classroom/${userType}/profile`,
      isActive: pathname.startsWith(`/classroom/${userType}/profile`),
    },
  ];

  return {
    navItems,
  };
};
