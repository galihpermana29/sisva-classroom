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
      showGuru && classSchedules
        ? classSchedules
            .filter((schedule) => schedule.study_program_id === parseInt(prodi))
            .flatMap((schedule) => ({
              teacher_id: schedule.teacher_id,
              teacher_name: schedule.teacher_name,
            }))
        : [],
    [prodi, classSchedulesIsStale]
  );

  return availableTeachers;
};
