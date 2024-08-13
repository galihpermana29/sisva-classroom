"use client";

import { useMemo } from "react";

export const useGetAvailableGrades = (
  prodi,
  studyPrograms,
  studyProgramIsStale,
  showGrade
) => {
  const availableGrades = useMemo(
    () =>
      showGrade && studyPrograms
        ? studyPrograms
            .filter((studyProgram) => studyProgram.id === parseInt(prodi))
            .flatMap((studyProgram) => studyProgram.grades)
            .filter((grade) => grade)
        : [],
    [prodi, studyProgramIsStale]
  );

  return availableGrades;
};
