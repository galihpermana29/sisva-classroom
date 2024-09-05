"use client";

import AcademicAPI from "@/api/academic";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";

export const useGetSchoolSchedule = () => {
  const { periode, prodi, tingkat } = useFilterStatus();

  // should fetch when all filter is selected
  const shouldFetch = Boolean(periode && prodi && tingkat);

  const { data: queryResult, ...query } = useQuery({
    queryKey: ["school-schedule", { periode, shouldFetch }],
    queryFn: () => AcademicAPI.getSchoolSchedule(periode),
    enabled: shouldFetch,
  });

  const result = queryResult ? queryResult.data.data : undefined;
  const data = useMemo(() => {
    return result
      ? result
          .filter(
            (data) =>
              data.period_id === parseInt(periode) &&
              data.study_program_id === parseInt(prodi) &&
              data.grade === tingkat
          )
          // sort date ascending
          .sort((a, b) => a.day - b.day)
      : undefined;
  }, [periode, prodi, tingkat, query.isStale]);

  return { data, ...query };
};
