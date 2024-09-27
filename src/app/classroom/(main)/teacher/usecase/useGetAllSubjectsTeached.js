import { useEffect, useState } from "react";
import { getAllTeachersSubjects } from "../repositories/apiService";
import { getCookie } from "cookies-next";

export const useGetAllSubjectsTeached = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const {id: teacherId} = JSON.parse(getCookie("userData"))

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

      const subjectsByTeacher = subjects.filter(
        (subject) => subject.teacher_id == teacherId
      );

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
