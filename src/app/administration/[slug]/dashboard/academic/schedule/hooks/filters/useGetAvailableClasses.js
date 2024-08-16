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
      deduplicateClasses(
        showKelas && classSchedules
          ? classSchedules
              .filter(
                (schedule) => schedule.study_program_id === parseInt(prodi)
              )
              .filter((schedule) => schedule.grade === grade)
              .flatMap((schedule) => ({
                class_id: schedule.class_id,
                class_name: schedule.class_name,
              }))
          : []
      ),
    [prodi, grade, classSchedulesIsStale]
  );

  return availableClasses;
};

const deduplicateClasses = (classes) => {
  let seen = new Set();
  return classes.filter((kelas) => {
    // check if we already seen the same class id, if yes then remove it as it is a duplicate
    const key = kelas.class_id;
    return seen.has(key) ? false : seen.add(key);
  });
};
