import { useEffect, useState } from "react";

import { getAllTeachersSubjects } from "../repositories/apiService";
import { getUserDataCookie } from "./getUserDataCookie";

export const useGetAllSubjectsTeached = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const {id: teacherId} = getUserDataCookie();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const {
        data: subjects,
        message,
        success,
      } = await getAllTeachersSubjects();

      if (!success) {
        setError(message);
        setIsLoading(false);
        return;
      }

      const subjectsByTeacher = subjects
      ?.filter((subject) => subject.teacher_id == teacherId)
      .map((subject) => subject.subject_name);

      setData(subjectsByTeacher);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    isLoading,
    error,
    data,
  };
};
