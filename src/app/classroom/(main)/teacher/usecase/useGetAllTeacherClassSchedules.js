import { useEffect, useState } from "react";
import { getClassScheduleById } from "../repositories/apiService";

export const useGetAllTeacherClassSchedules = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const subjects = await getClassScheduleById();
        setData(subjects);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { isLoading, error, data };
};
