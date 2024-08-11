"use client";

import AcademicAPI from "@/api/academic";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PERIODE_FIELD_NAME } from "../components/filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "../components/filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "../components/filters/TingkatSelect";
import { useMemo } from "react";

export const useGetClassSchedule = () => {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);
  const tingkat = searchParams.get(TINGKAT_FIELD_NAME);

  // should fetch when all filter is selected
  const shouldFetch = Boolean(periode && prodi && tingkat);

  const { data: queryResult, ...query } = useQuery({
    queryKey: ["class-schedule", { shouldFetch }],
    queryFn: () => AcademicAPI.getClassSchedule(),
    enabled: shouldFetch,
  });

  const result = queryResult ? queryResult.data.data : undefined;
  const data = useMemo(() => {
    return result
      ? result.filter(
          (data) =>
            data.period_id === parseInt(periode) &&
            data.study_program_id === parseInt(prodi) &&
            data.grade === tingkat &&
            data.status === "active"
        )
      : undefined;
  }, [periode, prodi, tingkat, query.isStale]);

  return { data, ...query };
};
