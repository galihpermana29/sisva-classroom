import { useEffect, useState } from "react";
import { getClassSchedules } from "../repositories/apiService";
import { getUserDataCookie } from "./getUserDataCookie";

export const useGetAllTeacherClassSchedules = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const { id: teacherId } = getUserDataCookie();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { data: subjects, message, success } = await getClassSchedules();

      if (!success) {
        setError(message);
        setIsLoading(false);
        return;
      }
      
      const teachingSchedule = subjects.filter(
        (schedule) => schedule.teacher_id == teacherId
      );

      setData(teachingSchedule);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { isLoading, error, data };
};
