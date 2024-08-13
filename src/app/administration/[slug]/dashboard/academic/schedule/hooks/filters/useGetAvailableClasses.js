"use client";

import { useMemo } from "react";

export const useGetAvailableClasses = (
  grade,
  prodi,
  classSchedules,
  classSchedulesIsStale,
  showKelas
) => {
  const availableClasses = useMemo(
    () =>
      showKelas && classSchedules
        ? classSchedules
            .filter((schedule) => schedule.study_program_id === parseInt(prodi))
            .filter((schedule) => schedule.grade === grade)
            .flatMap((schedule) => ({
              class_id: schedule.class_id,
              class_name: schedule.class_name,
            }))
        : [],
    [prodi, grade, classSchedulesIsStale]
  );

  return availableClasses;
};
