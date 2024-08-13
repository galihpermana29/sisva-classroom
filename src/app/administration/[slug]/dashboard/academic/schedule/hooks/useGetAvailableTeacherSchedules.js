"use client";

import { useMemo } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";
import { useGetClassSchedule } from "./useGetClassSchedule";
import { timeStringToDayjs } from "@/utils/formatTimeString";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useGetNonLearningSchedule } from "./useGetNonLearningSchedule";
dayjs.extend(isoWeek);

export const useGetAvailableTeacherSchedules = () => {
  const { guru } = useFilterStatus();
  const { data: learningSchedule, isStale: learningScheduleIsStale } =
    useGetClassSchedule();
  const { data: nonLearningSchedule, isStale: nonLearningScheduleIsStale } =
    useGetNonLearningSchedule();

  const classSchedules = useMemo(() => {
    const filteredLearningSchedule = filterLearningSchedule(
      learningSchedule,
      guru
    );

    const formattedLearning = formatLearningSchedule(filteredLearningSchedule);
    const formattedNonLearning = formatNonLearningSchedule(nonLearningSchedule);

    return formattedLearning.concat(formattedNonLearning);
  }, [guru, learningScheduleIsStale, nonLearningScheduleIsStale]);

  return classSchedules;
};

const filterLearningSchedule = (schedule, guru) => {
  if (!schedule) return [];
  return schedule.filter((schedule) => schedule.teacher_id === guru);
};

const formatNonLearningSchedule = (schedule) => {
  if (!schedule) return [];
  return schedule.map((schedule) => ({
    Id: schedule.id,
    Subject: schedule.name,
    StartTime: timeStringToDayjs(schedule.start_time)
      .isoWeekday(schedule.day)
      .toDate()
      .toLocaleString(),
    EndTime: timeStringToDayjs(schedule.end_time)
      .isoWeekday(schedule.day)
      .toDate()
      .toLocaleString(),
  }));
};

const formatLearningSchedule = (schedule) => {
  if (!schedule) return [];
  return schedule.map((schedule) => ({
    Id: schedule.id,
    Subject: schedule.subject_name,
    StartTime: timeStringToDayjs(schedule.start_time)
      .isoWeekday(schedule.day)
      .toDate()
      .toLocaleString(),
    EndTime: timeStringToDayjs(schedule.end_time)
      .isoWeekday(schedule.day)
      .toDate()
      .toLocaleString(),
  }));
};
