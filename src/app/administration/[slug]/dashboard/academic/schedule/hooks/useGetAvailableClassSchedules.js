"use client";

import { useMemo } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";
import { useGetClassSchedule } from "./useGetClassSchedule";

import { useGetNonLearningSchedule } from "./useGetNonLearningSchedule";
import { formatAndCombineSchedule } from "../utils/formatAndCombineSchedule";
import { countConsecutiveAppearances } from "../utils/countScheduleConsecutiveAppearance";

export const useGetAvailableClassSchedules = () => {
  const { kelas } = useFilterStatus();
  const { data: learningSchedule, isStale: learningScheduleIsStale } =
    useGetClassSchedule();
  const { data: nonLearningSchedule, isStale: nonLearningScheduleIsStale } =
    useGetNonLearningSchedule();

  const classSchedules = useMemo(() => {
    const filteredLearning = filterLearningSchedule(learningSchedule, kelas);
    const countedNonLearning = countConsecutiveAppearances(nonLearningSchedule);
    return formatAndCombineSchedule(filteredLearning, countedNonLearning);
  }, [kelas, learningScheduleIsStale, nonLearningScheduleIsStale]);

  return classSchedules;
};

const filterLearningSchedule = (schedules, kelas) => {
  if (!schedules) return [];
  return schedules.filter((schedule) => schedule.class_id === parseInt(kelas));
};
