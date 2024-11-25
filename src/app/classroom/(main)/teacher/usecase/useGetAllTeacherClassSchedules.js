import { useEffect, useState } from "react";

import {
  generalDateFormatter,
  getDayName,
  isBefore,
  TIME_FORMAT
} from "@/app/classroom/shared/usecase/helper";

import { getClassSchedules } from "../repositories/apiService";
import { getUserDataCookie } from "./getUserDataCookie";

export const useGetAllTeacherClassSchedules = () => {
  const currentDayName = new Date().toLocaleString("id-ID", { weekday: "long" });
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

      const teachingSchedule = subjects?.filter(
        (schedule) => schedule.teacher_id == teacherId && getDayName(schedule.day) == currentDayName
      );

      teachingSchedule?.sort((a, b) => {
        return isBefore(a.start_time, b.start_time, TIME_FORMAT) ? -1 : 1;
      });

      setData(teachingSchedule);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { isLoading, error, data };
};
