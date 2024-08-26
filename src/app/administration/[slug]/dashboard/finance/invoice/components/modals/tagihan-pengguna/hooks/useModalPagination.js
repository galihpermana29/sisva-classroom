import { useState } from "react";

export const useModalPagination = ({ target }) => {
  const initialPage = 1;
  const [studentTablePage, setStudentTablePage] = useState(initialPage);
  const [staffTablePage, setStaffTablePage] = useState(initialPage);

  const getCurrentPage = (userType) => {
    switch (userType) {
      case "student":
        return studentTablePage;
      case "staff":
        return staffTablePage;
      default:
        return initialPage;
    }
  };

  const getSetPage = (userType) => {
    switch (userType) {
      case "student":
        return setStudentTablePage;
      case "staff":
        return setStaffTablePage;
      default:
        return;
    }
  };

  const currentPage = getCurrentPage(target);
  const setPage = getSetPage(target);

  return { currentPage, setPage };
};
