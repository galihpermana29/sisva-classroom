"use client";

import { useGetAllPeriods } from "@/hooks/query/academic/useGetAllPeriods";
import dayjs from "dayjs";
import { useMemo } from "react";

export const useGetDefaultPeriod = () => {
  const { data: periods, isStale: periodIsStale } = useGetAllPeriods();

  // recompute when periods changed or when query cache invalidated
  const defaultPeriod = useMemo(
    () =>
      periods
        ? periods
            // sort by date
            .sort((period) =>
              dayjs(period.end_time, "DD/MM/YYYY h:mm a Z").diff(
                dayjs(period.start_time, "DD/MM/YYYY h:mm a Z")
              )
            )
            // get the latest period id
            .at(-1).id
        : "",
    [periods, periodIsStale]
  );

  return defaultPeriod;
};
