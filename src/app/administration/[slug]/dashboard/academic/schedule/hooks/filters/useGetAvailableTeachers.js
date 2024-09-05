"use client";

import { useMemo } from "react";

export const useGetAvailableTeachers = (
  prodi,
  classSchedules,
  classSchedulesIsStale,
  showGuru
) => {
  const availableTeachers = useMemo(
    () =>
      deduplicateTeachers(
        showGuru && classSchedules
          ? classSchedules
              .filter(
                (schedule) => schedule.study_program_id === parseInt(prodi)
              )
              .flatMap((schedule) => ({
                teacher_id: schedule.teacher_id,
                teacher_name: schedule.teacher_name,
              }))
          : []
      ),
    [prodi, classSchedulesIsStale]
  );

  return availableTeachers;
};

const deduplicateTeachers = (teachers) => {
  let seen = new Set();
  return teachers.filter((teacher) => {
    // check if we already seen the same class id, if yes then remove it as it is a duplicate
    const key = teacher.teacher_id;
    return seen.has(key) ? false : seen.add(key);
  });
};
