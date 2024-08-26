import { useState } from "react";

export const useUserFilter = ({ target }) => {
  const initialFilter =
    target === "student"
      ? { period: "", studyProgram: "", grade: "", kelas: "", search: "" }
      : { search: "" };
  const [userFilter, setUserFilter] = useState(initialFilter);
  return { userFilter, setUserFilter };
};
