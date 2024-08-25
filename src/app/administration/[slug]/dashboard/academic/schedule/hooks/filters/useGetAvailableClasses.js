"use client";

import { useMemo } from "react";

export const useGetAvailableClasses = (
  period,
  grade,
  prodi,
  studentGroups,
  studentGroupsIsStale,
  showKelas
) => {
  const availableClasses = useMemo(
    () =>
      deduplicateClasses(
        showKelas && studentGroups
          ? studentGroups
              .filter(
                (studentGroup) =>
                  studentGroup.study_program_id === parseInt(prodi)
              )
              .filter((studentGroup) => studentGroup.grade === grade)
              .filter(
                (studentGroup) => studentGroup.period_id === parseInt(period)
              )
              .flatMap((studentGroup) => ({
                class_id: studentGroup.id,
                class_name: studentGroup.name,
              }))
          : []
      ),
    [period, prodi, grade, studentGroupsIsStale]
  );

  return availableClasses;
};

const deduplicateClasses = (classes) => {
  let seen = new Set();
  return classes.filter((kelas) => {
    // check if we already seen the same class id, if yes then remove it as it is a duplicate
    const key = kelas.id;
    return seen.has(key) ? false : seen.add(key);
  });
};
