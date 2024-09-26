"use client";

import { useEffect, useState } from "react";
import {
  getAllClasses,
  getAllClassSchedules,
  getStudentGroups,
} from "../repository/student";

export const useGetStudentSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const studentsGroup = await getStudentGroups();
        const foundStudent = studentsGroup.find(
          (student) =>
            student.student_id === "5ffcd106-3e30-4e7d-bbbf-23c7bcd9a3a3"
        );
        const studentGroupId = foundStudent.student_group_id;

        const classes = await getAllClasses();

        const classStudent = classes.filter(
          (studentClass) => studentClass.student_group_id == studentGroupId
        );

        const schedules = await getAllClassSchedules();

        const filteredSchedule = classStudent.map((cls) => {
          const schedule = schedules.filter((sch) => sch.class_id === cls.id);
          return schedule;
        });

        setSchedules(filteredSchedule);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { schedules, error, isLoading };
};
