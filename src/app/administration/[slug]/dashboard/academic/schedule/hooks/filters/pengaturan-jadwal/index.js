"use client";

import { useEnsureFilterOrder } from "../useEnsureFilterOrder";
import { useSetDefaultPeriod } from "../useSetDefaultPeriod";
import { useResetFilterOnProdiChange } from "../useResetFilterOnProdiChange";
import { useResetFilterOnPeriodeChange } from "../useResetFilterOnPeriodeChange";
import { useGetAvailableStudyPrograms } from "../useGetAvailableStudyPrograms";
import { useGetAvailableGrades } from "../useGetAvailableGrades";
import { useFilterStatus } from "../useFilterStatus";
import { useGetShowFilterStatus } from "../useGetShowFilterStatus";
import { useGetAllPeriods } from "@/hooks/useGetAllPeriods";
import { useGetAllStudyPrograms } from "@/hooks/useGetAllStudyPrograms";

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
