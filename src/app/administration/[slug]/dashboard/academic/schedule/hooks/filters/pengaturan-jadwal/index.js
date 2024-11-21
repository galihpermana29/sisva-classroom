"use client";

import { useGetAllPeriods } from "@/hooks/query/academic/useGetAllPeriods";
import { useGetAllStudyPrograms } from "@/hooks/query/academic/useGetAllStudyPrograms";
import { useEnsureFilterOrder } from "../useEnsureFilterOrder";
import { useFilterStatus } from "../useFilterStatus";
import { useGetAvailableGrades } from "../useGetAvailableGrades";
import { useGetAvailableStudyPrograms } from "../useGetAvailableStudyPrograms";
import { useGetShowFilterStatus } from "../useGetShowFilterStatus";
import { useResetFilterOnPeriodeChange } from "../useResetFilterOnPeriodeChange";
import { useResetFilterOnProdiChange } from "../useResetFilterOnProdiChange";
import { useSetDefaultPeriod } from "../useSetDefaultPeriod";

export const useGetFilterPengaturanJadwal = () => {
  const { periode, prodi } = useFilterStatus();
  const { showProdi, showGrade } = useGetShowFilterStatus();

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

  return { availablePeriods, availableStudyPrograms, availableGrades };
};
