"use client";

import AcademicAPI from "@/api/academic";
import { useQuery } from "@tanstack/react-query";

export const useGetSKS = () => {
  const { data: queryResult, ...query } = useQuery({
    queryKey: ["get-sks"],
    queryFn: () => AcademicAPI.getCredit(),
  });

  const data = queryResult ? queryResult.data.data : undefined;
  return { data, ...query };
};
