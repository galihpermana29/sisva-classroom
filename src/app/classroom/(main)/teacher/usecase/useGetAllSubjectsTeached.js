import { useEffect, useState } from "react";
import { getAllSubjectTeached } from "../repositories/apiService";


export const useGetAllSubjectsTeached = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const subjects = await getAllSubjectTeached();
        const subjectsName = subjects.map((subject) => subject.subject_name);
        setData(subjectsName);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isLoading,
    error,
    data,
  };
};
