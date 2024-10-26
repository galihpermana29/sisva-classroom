"use client";

import { useMemo } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";
import { useGetClassSchedule } from "./useGetClassSchedule";

import { useGetAllClasses } from "@/hooks/useGetAllClasses";
import { countConsecutiveAppearances } from "../utils/countScheduleConsecutiveAppearance";
import { formatAndCombineSchedule } from "../utils/formatAndCombineSchedule";
import { useGetNonLearningSchedule } from "./useGetNonLearningSchedule";

export const useGetAvailableTeacherSchedules = () => {
  const { guru } = useFilterStatus();
  const { data: learningSchedule, isStale: learningScheduleIsStale } =
    useGetClassSchedule();
  const { data: nonLearningSchedule, isStale: nonLearningScheduleIsStale } =
    useGetNonLearningSchedule();
  const { data: classes, isStale: classesIsStale } = useGetAllClasses();

  const classSchedules = useMemo(() => {
    const filteredLearning = filterLearningSchedule(learningSchedule, guru);
    const countedNonLearning = countConsecutiveAppearances(nonLearningSchedule);
    return formatAndCombineSchedule(
      filteredLearning,
      countedNonLearning,
      classes
    );
  }, [
    guru,
    learningScheduleIsStale,
    nonLearningScheduleIsStale,
    classesIsStale,
  ]);

  return classSchedules;
};

const filterLearningSchedule = (schedules, guru) => {
  if (!schedules) return [];
  return schedules.filter((schedule) => schedule.teacher_id === guru);
};
