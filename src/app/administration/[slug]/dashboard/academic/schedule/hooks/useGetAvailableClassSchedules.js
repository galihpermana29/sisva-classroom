"use client";

import { useMemo } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";
import { useGetClassSchedule } from "./useGetClassSchedule";
import {
  timeStringToDayjs,
  timeStringToLocalTimeString,
} from "@/utils/formatTimeString";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useGetNonLearningSchedule } from "./useGetNonLearningSchedule";
dayjs.extend(isoWeek);

export const useGetAvailableClassSchedules = () => {
  const { kelas } = useFilterStatus();
  const { data: learningSchedule, isStale: learningScheduleIsStale } =
    useGetClassSchedule();
  const { data: nonLearningSchedule, isStale: nonLearningScheduleIsStale } =
    useGetNonLearningSchedule();

  const classSchedules = useMemo(() => {
    const filteredLearningSchedule = filterLearningSchedule(
      learningSchedule,
      kelas
    );

    const formattedLearning = formatLearningSchedule(filteredLearningSchedule);
    const formattedNonLearning = formatNonLearningSchedule(nonLearningSchedule);

    const filteredDuplicateNonLearning =
      filterDuplicateNonLearning(formattedNonLearning);

    return formattedLearning.concat(filteredDuplicateNonLearning);
  }, [kelas, learningScheduleIsStale, nonLearningScheduleIsStale]);

  return classSchedules;
};

const filterLearningSchedule = (schedule, kelas) => {
  if (!schedule) return [];
  return schedule.filter((schedule) => schedule.class_id === parseInt(kelas));
};

const formatNonLearningSchedule = (schedules) => {
  if (!schedules) return [];
  return schedules.map((schedule) => ({
    Id: schedule.id,
    Subject: schedule.name,
    Type: "non-learning",
    Color: "#FFDBCB",
    AppearanceCount: countConsecutiveAppearance(schedules, schedule),
    StartTime: formatToLocaleString(schedule.start_time, schedule.day),
    EndTime: formatToLocaleString(schedule.end_time, schedule.day),
  }));
};

const formatLearningSchedule = (schedules) => {
  if (!schedules) return [];
  return schedules.map((schedule) => ({
    Id: schedule.id,
    Subject: schedule.subject_name,
    Type: "learning",
    Color: "#ACDEE7",
    StartTime: formatToLocaleString(schedule.start_time, schedule.day),
    EndTime: formatToLocaleString(schedule.end_time, schedule.day),
    TeacherName: schedule.teacher_name,
  }));
};

const formatToLocaleString = (timeString, isoWeekday) =>
  timeStringToDayjs(timeString)
    .isoWeekday(isoWeekday)
    .toDate()
    .toLocaleString();

const countConsecutiveAppearance = (schedules, currentSchedule) => {
  // compare local time string as reference
  const timeIsEqual = (a, b) =>
    timeStringToLocalTimeString(a) === timeStringToLocalTimeString(b);

  const filteredSchedule = schedules
    // select schedule with the same name, start_time and end_time
    .filter(
      (schedule) =>
        schedule.name === currentSchedule.name &&
        timeIsEqual(schedule.start_time, currentSchedule.start_time) &&
        timeIsEqual(schedule.end_time, currentSchedule.end_time)
    )
    // further filter the one with consecutive days
    .filter(
      (schedule) =>
        // count schedule with same day
        schedule.day === currentSchedule.day ||
        // or the day before
        schedule.day - 1 === currentSchedule.day ||
        // or the day after
        schedule.day + 1 === currentSchedule.day
    );

  // length of the filtered array is the consecutive appearance count
  const maxConsecutiveCount =
    filteredSchedule.length === 0 ? 1 : filteredSchedule.length;

  return maxConsecutiveCount;
};

const filterDuplicateNonLearning = (formattedSchedules) => {
  let seen = new Set();
  return formattedSchedules.filter((schedule) => {
    const appearance = schedule.AppearanceCount;
    const name = schedule.Subject;
    // no need to check if it only appeared once
    if (appearance === 1) return true;
    // check if we already seen the same schedule, if yes then remove it as it is a duplicate
    return seen.has(name) ? false : seen.add(name);
  });
};
