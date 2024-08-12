"use client";

import { useGetSchoolSchedule } from "./useGetSchoolSchedule";

export const useGetActiveSchoolSchedule = () => {
  const { data: result } = useGetSchoolSchedule();
  const data = result
    ? result.filter((schedule) => schedule.status === "active")
    : undefined;

  return { data };
};
