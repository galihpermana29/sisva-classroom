"use client";

import { useMemo } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";
import { useGetClassSchedule } from "./useGetClassSchedule";

import { useGetNonLearningSchedule } from "./useGetNonLearningSchedule";
import { formatAndCombineSchedule } from "../utils/formatAndCombineSchedule";
import { countConsecutiveAppearances } from "../utils/countScheduleConsecutiveAppearance";

export const useGetAvailableTeacherSchedules = () => {
  const { guru } = useFilterStatus();
  const { data: learningSchedule, isStale: learningScheduleIsStale } =
    useGetClassSchedule();
  const { data: nonLearningSchedule, isStale: nonLearningScheduleIsStale } =
    useGetNonLearningSchedule();

  const classSchedules = useMemo(() => {
    const filteredLearning = filterLearningSchedule(learningSchedule, guru);
    const countedNonLearning = countConsecutiveAppearances(nonLearningSchedule);
    return formatAndCombineSchedule(filteredLearning, countedNonLearning);
  }, [guru, learningScheduleIsStale, nonLearningScheduleIsStale]);

  return classSchedules;
};

const filterLearningSchedule = (schedules, guru) => {
  if (!schedules) return [];
  return schedules.filter((schedule) => schedule.teacher_id === guru);
};
