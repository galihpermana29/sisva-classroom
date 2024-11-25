import { Home05, User01, Users01 } from "@untitled-ui/icons-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PATHS = {
  TEACHING_MATERIAL: `/classroom/teacher/teaching-material`,
  CLASS: `/classroom/teacher/class`,
  STUDENT_CLASS: `/classroom/student/class`,
};

export const useNavbar = (userType) => {
  const [navbarState, setNavbarState] = useState({
    text: "",
    description: "",
  });

  const pathname = usePathname();
  const classData = useSelector((state) => state.classData.detailClass);
  const isFetching = useSelector((state) => state.classData.isFetching);

  useEffect(() => {
    let newText = "";
    if (pathname.startsWith(PATHS.TEACHING_MATERIAL)) {
      newText = "Daftar Bahan Ajar";
    } else if (
      classData &&
      (pathname.startsWith(PATHS.CLASS) ||
        pathname.startsWith(PATHS.STUDENT_CLASS)) &&
      pathname !== PATHS.CLASS &&
      pathname !== PATHS.STUDENT_CLASS
    ) {
      newText = `${classData.subject_name} - ${classData.student_group_name}`;
    }

    let newDescription = "";
    if (
      classData &&
      !isFetching &&
      (pathname.startsWith(PATHS.CLASS) ||
        pathname.startsWith(PATHS.STUDENT_CLASS)) &&
      pathname !== PATHS.CLASS &&
      pathname !== PATHS.STUDENT_CLASS
    ) {
      newDescription = classData.teacher_name;
    }

    setNavbarState({
      text: newText,
      description: newDescription,
    });
  }, [classData, pathname, isFetching]);

  const navbarLogo = () => {
    const schoolDataJson =
      typeof window !== "undefined" && localStorage.getItem("schoolData");
    const schoolData = JSON.parse(schoolDataJson);

    return schoolData?.logo_uri;
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
    navbarText: navbarState.text,
    navbarDescription: navbarState.description,
    isFetching,
    navbarLogo,
  };
};
