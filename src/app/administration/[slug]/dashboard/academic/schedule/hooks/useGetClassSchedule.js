"use client";

import AcademicAPI from "@/api/academic";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";

export const useGetClassSchedule = () => {
  const { periode, prodi, tingkat } = useFilterStatus();

  // because we'll get available class_id from class schedule
  // we'll need to fetch after tingkat filter is selected
  const shouldFetch = Boolean(periode && prodi);

  const { data: queryResult, ...query } = useQuery({
    queryKey: ["class-schedule", { periode, shouldFetch }],
    queryFn: () => AcademicAPI.getClassSchedule(periode),
    enabled: shouldFetch,
  });

  const result = queryResult ? queryResult.data.data : undefined;
  const data = useMemo(() => {
    return result
      ? result
          .filter((schedule) => schedule.study_program_id === parseInt(prodi))
          // if tingkat filter is not selected, then skip this filter
          .filter((schedule) => (tingkat ? schedule.grade === tingkat : true))
      : undefined;
  }, [periode, prodi, tingkat, query.isStale]);

  return { data, ...query };
};
