import { useState, useEffect } from "react";
import {
  getAllClasses,
  getAllClassSchedules,
  getStudentGroups,
} from "../repository/apiService";
import { getCookie } from "cookies-next";

export function useGetStudentSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(getCookie("userData"));

      const {
        data: studentGroups,
        success,
        message,
      } = await getStudentGroups();

      if (!success) {
        setError(message);
        setIsLoading(false);
        return;
      }
      
      const joinedStudentGroups = studentGroups.filter(
        (student) => student.student_id === user.id
      );

      const {
        data: classes,
        success: classesResSuccess,
        message: classesResMessage,
      } = await getAllClasses();

      if (!classesResSuccess || !Array.isArray(classes)) {
        setError(classesResMessage);
        setIsLoading(false);
        return;
      }


      const classStudent = classes.filter((cls) =>
        joinedStudentGroups.some(
          (group) => group.student_group_id === cls.student_group_id
        )
      );

      const {
        data: schedules,
        success: scheduleResSuccess,
        message: scheduleResMessage,
      } = await getAllClassSchedules();

      if (!scheduleResSuccess || !Array.isArray(schedules)) {
        setError(scheduleResMessage);
        setIsLoading(false);
        return;
      }
      console.log("classStudent", classStudent);

      console.log("schedule", schedules);
      const filteredSchedule = classStudent.flatMap((cls, i) => {
        const schedule = schedules.filter((sch) => sch.class_id === cls.id);
        return schedule.length > 0 ? schedule[i] : [];
      });

      setSchedules(filteredSchedule);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    schedules,
    error,
    isLoading,
  };
}
