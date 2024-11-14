"use client";

import { useMemo } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";
import { useGetClassSchedule } from "./useGetClassSchedule";

import { useGetAllClasses } from "@/hooks/useGetAllClasses";
import { countConsecutiveAppearances } from "../utils/countScheduleConsecutiveAppearance";
import { formatAndCombineSchedule } from "../utils/formatAndCombineSchedule";
import { useGetNonLearningSchedule } from "./useGetNonLearningSchedule";

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
  const matchingClassIds = classes
    ?.filter((kelas) => kelas.student_group_id === parseInt(studentGroupFilter))
    .map((kelas) => kelas.id);

  if (!schedules || !matchingClassIds) return [];
  return schedules.filter((schedule) =>
    matchingClassIds.includes(schedule.class_id)
  );
};
