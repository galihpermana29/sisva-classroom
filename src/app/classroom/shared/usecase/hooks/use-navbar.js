import { Home05, User01, Users01 } from "@untitled-ui/icons-react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const PATHS = {
  TEACHING_MATERIAL: "/classroom/teacher/teaching-material",
  CLASS: "/classroom/teacher/class",
};

export const useNavbar = (userType) => {
  const pathname = usePathname();
  const classData = useSelector((state) => state.classData.detailClass);
  const isFetching = useSelector((state) => state.classData.isFetching);

  const navbarText = () => {
    // normal navbar text
    if (!classData && !isFetching) {
      if (pathname.startsWith(PATHS.TEACHING_MATERIAL)) {
        return "Daftar Bahan Ajar";
      }
    }

    // dynamic navbar text
    if (classData) {
      if (
        pathname.startsWith(PATHS.CLASS) &&
        pathname !== "/classroom/teacher/class"
      ) {
        return `${classData?.subject_name} - ${classData?.student_group_name}`;
      }
    }

    return null;
  };

  const navbarDescription = () => {
    if (!classData && !isFetching) return "";
    if (classData) {
      if (
        pathname.startsWith(PATHS.CLASS) &&
        pathname !== "/classroom/teacher/class"
      ) {
        return classData?.teacher_name;
      }
    }

    return null;
  };

  const navItems = [
    {
      icon: Home05,
      label: "Beranda",
      path: `/classroom/${userType}`,
      isActive:
        pathname === "/classroom/student" || pathname === "/classroom/teacher",
    },
    {
      icon: Users01,
      label: "Kelas",
      path: `/classroom/${userType}/class`,
      isActive:
        pathname.startsWith(`/classroom/student/class`) ||
        pathname.startsWith(`/classroom/teacher/class`),
    },
    {
      icon: User01,
      label: "Profil",
      path: `/classroom/${userType}/profile`,
      isActive:
        pathname.startsWith("/classroom/student/profile") ||
        pathname.startsWith("/classroom/teacher/profile"),
    },
  ];

  return {
    navItems,
    navbarText,
    navbarDescription,
    isFetching,
  };
};
