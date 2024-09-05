"use client";

import { useMemo } from "react";

export const useGetAvailableStudyPrograms = (
  periode,
  periods,
  periodIsStale,
  showProdi
) => {
  const availableStudyPrograms = useMemo(
    () =>
      showProdi && periods
        ? periods
            .filter((period) => period.id === parseInt(periode))
            .flatMap((periods) => periods.study_programs)
            .filter((studyProgram) => studyProgram)
        : [],
    [periode, periodIsStale]
  );

  return availableStudyPrograms;
};
