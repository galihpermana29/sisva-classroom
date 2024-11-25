"use client";

import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";

export const useGetAllPeriods = (param) => {
  const { data: queryResult, ...query } = useQuery({
    queryKey: ["get-periods"],
    queryFn: () => AcademicAPI.getAllPeriod(),
    enabled: param?.enabled === false ? false : true,
  });

  const result = queryResult ? queryResult.data.data : undefined;
  return { data: result, ...query };
};
