"use client";

import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";

export const useGetSKS = () => {
  const { data: queryResult, ...query } = useQuery({
    queryKey: ["get-sks"],
    queryFn: () => AcademicAPI.getCredit(),
  });

  const data = queryResult ? queryResult.data.data : undefined;
  return { data, ...query };
};
