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
      const user = JSON.stringify(getCookie("userData"));

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

      const foundStudent = studentGroups.find(
        (student) => student.student_id === user.id
      );
      const studentGroupId = foundStudent.student_group_id;

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

      const classStudent = classes.filter(
        (studentClass) => studentClass.student_group_id == studentGroupId
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

      const filteredSchedule = classStudent.map((cls) => {
        const schedule = schedules.filter((sch) => sch.class_id === cls.id);
        return schedule;
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
