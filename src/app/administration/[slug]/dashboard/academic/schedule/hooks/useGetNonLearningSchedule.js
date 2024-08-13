"use client";

import { useQuery } from "@tanstack/react-query";
import { useFilterStatus } from "./filters/useFilterStatus";
import AcademicAPI from "@/api/academic";
import { useMemo } from "react";

export const useGetNonLearningSchedule = () => {
  const { periode, prodi, tingkat } = useFilterStatus();

  // because we'll get available class_id from class schedule
  // we'll need to fetch after tingkat filter is selected
  const shouldFetch = Boolean(periode && prodi);

  const { data: queryResult, ...query } = useQuery({
    queryKey: ["non-learning-schedule", { periode }],
    queryFn: () => AcademicAPI.getNonLearningSchedule(periode),
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
