"use client";

import { useGetAllPeriods } from "@/hooks/query/academic/useGetAllPeriods";

import { useGetClassSchedule } from "../../useGetClassSchedule";
import { useEnsureFilterOrder } from "../useEnsureFilterOrder";
import { useFilterStatus } from "../useFilterStatus";
import { useGetAvailableStudyPrograms } from "../useGetAvailableStudyPrograms";
import { useGetAvailableTeachers } from "../useGetAvailableTeachers";
import { useGetShowFilterStatus } from "../useGetShowFilterStatus";
import { useResetFilterOnPeriodeChange } from "../useResetFilterOnPeriodeChange";
import { useResetFilterOnProdiChange } from "../useResetFilterOnProdiChange";
import { useSetDefaultPeriod } from "../useSetDefaultPeriod";

export const useGetFilterJadwalGuru = () => {
  const { periode, prodi } = useFilterStatus();
  const { showProdi, showGuru } = useGetShowFilterStatus();

  // ORDER OF EXECUTION MATTERS HERE
  // make sure to execute useSetDefaultPeriod last for it to take effect!
  void useResetFilterOnPeriodeChange(periode); // handle periode filter change
  void useResetFilterOnProdiChange(prodi); // handle prodi filter change

  void useEnsureFilterOrder(periode, prodi); // ensuring order of filter is right
  void useSetDefaultPeriod(periode); // set default period if it doensn't exist

  const { data: availablePeriods, isStale: periodIsStale } = useGetAllPeriods();
  const availableStudyPrograms = useGetAvailableStudyPrograms(
    periode,
    availablePeriods,
    periodIsStale,
    showProdi
  ); // get available study programs based on period filter data

  const { data: classSchedules, isStale: classSchedulesIsStale } =
    useGetClassSchedule();
  const availableTeachers = useGetAvailableTeachers(
    prodi,
    classSchedules,
    classSchedulesIsStale,
    showGuru
  ); // get available teachers based on data from class schedules

  return {
    availablePeriods,
    availableStudyPrograms,
    availableTeachers,
  };
};
