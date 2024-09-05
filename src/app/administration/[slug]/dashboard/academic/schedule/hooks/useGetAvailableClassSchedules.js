"use client";

import { useMemo } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";
import { useGetClassSchedule } from "./useGetClassSchedule";

import { useGetNonLearningSchedule } from "./useGetNonLearningSchedule";
import { formatAndCombineSchedule } from "../utils/formatAndCombineSchedule";
import { countConsecutiveAppearances } from "../utils/countScheduleConsecutiveAppearance";
import { useGetAllClasses } from "@/hooks/useGetAllClasses";

export const useGetAvailableClassSchedules = () => {
  const { kelas: studentGroupFilter } = useFilterStatus();
  const { data: learningSchedule, isStale: learningScheduleIsStale } =
    useGetClassSchedule();
  const { data: nonLearningSchedule, isStale: nonLearningScheduleIsStale } =
    useGetNonLearningSchedule();
  const { data: classes, isStale: classesIsStale } = useGetAllClasses();

  const classSchedules = useMemo(() => {
    const filteredLearning = filterLearningSchedule(
      learningSchedule,
      studentGroupFilter,
      classes
    );
    const countedNonLearning = countConsecutiveAppearances(nonLearningSchedule);
    return formatAndCombineSchedule(filteredLearning, countedNonLearning);
  }, [
    studentGroupFilter,
    classesIsStale,
    learningScheduleIsStale,
    nonLearningScheduleIsStale,
  ]);

  return classSchedules;
};

const filterLearningSchedule = (schedules, studentGroupFilter, classes) => {
  const matchingClass = classes?.find(
    (kelas) => kelas.student_group_id === parseInt(studentGroupFilter)
  );
  if (!schedules || !matchingClass) return [];
  return schedules.filter((schedule) => schedule.class_id === matchingClass.id);
};
