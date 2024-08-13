"use client";

import { useGetAllPeriods } from "@/hooks/useGetAllPeriods";
import { useFilterStatus } from "../useFilterStatus";
import { useGetShowFilterStatus } from "../useGetShowFilterStatus";
import { useGetAvailableStudyPrograms } from "../useGetAvailableStudyPrograms";
import { useGetClassSchedule } from "../../useGetClassSchedule";
import { useResetFilterOnPeriodeChange } from "../useResetFilterOnPeriodeChange";
import { useResetFilterOnProdiChange } from "../useResetFilterOnProdiChange";
import { useEnsureFilterOrder } from "../useEnsureFilterOrder";
import { useSetDefaultPeriod } from "../useSetDefaultPeriod";
import { useGetAvailableTeachers } from "../useGetAvailableTeachers";

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
