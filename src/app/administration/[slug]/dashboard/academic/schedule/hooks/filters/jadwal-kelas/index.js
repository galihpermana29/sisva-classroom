"use client";

import { useGetAllPeriods } from "@/hooks/useGetAllPeriods";
import { useFilterStatus } from "../useFilterStatus";
import { useGetShowFilterStatus } from "../useGetShowFilterStatus";
import { useGetAvailableStudyPrograms } from "../useGetAvailableStudyPrograms";
import { useGetAllStudyPrograms } from "@/hooks/useGetAllStudyPrograms";
import { useGetAvailableGrades } from "../useGetAvailableGrades";
import { useGetClassSchedule } from "../../useGetClassSchedule";
import { useResetFilterOnPeriodeChange } from "../useResetFilterOnPeriodeChange";
import { useResetFilterOnProdiChange } from "../useResetFilterOnProdiChange";
import { useEnsureFilterOrder } from "../useEnsureFilterOrder";
import { useSetDefaultPeriod } from "../useSetDefaultPeriod";
import { useGetAvailableClasses } from "../useGetAvailableClasses";
import { useResetFilterOnTingkatChange } from "../useResetFilterOnTingkatChange";

export const useGetFilterJadwalKelas = () => {
  const { periode, prodi, tingkat } = useFilterStatus();
  const { showProdi, showGrade, showKelas } = useGetShowFilterStatus();

  // ORDER OF EXECUTION MATTERS HERE
  // make sure to execute useSetDefaultPeriod last for it to take effect!
  void useResetFilterOnPeriodeChange(periode); // handle periode filter change
  void useResetFilterOnProdiChange(prodi); // handle prodi filter change
  void useResetFilterOnTingkatChange(tingkat); // handle tingkat filter change

  void useEnsureFilterOrder(periode, prodi); // ensuring order of filter is right
  void useSetDefaultPeriod(periode); // set default period if it doensn't exist

  const { data: availablePeriods, isStale: periodIsStale } = useGetAllPeriods();
  const availableStudyPrograms = useGetAvailableStudyPrograms(
    periode,
    availablePeriods,
    periodIsStale,
    showProdi
  ); // get available study programs based on period filter data

  const { data: studyPrograms, isStale: studyProgramIsStale } =
    useGetAllStudyPrograms({
      enabled: showGrade, // fetch only when we need to show grade
    });
  const availableGrades = useGetAvailableGrades(
    prodi,
    studyPrograms,
    studyProgramIsStale,
    showGrade
  ); // get available grades based on study program filter data

  const { data: classSchedules, isStale: classSchedulesIsStale } =
    useGetClassSchedule();
  const availableClasses = useGetAvailableClasses(
    tingkat,
    prodi,
    classSchedules,
    classSchedulesIsStale,
    showKelas
  ); // get available classes based on data from class schedules

  return {
    availablePeriods,
    availableStudyPrograms,
    availableGrades,
    availableClasses,
  };
};
