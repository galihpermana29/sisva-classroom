"use client";

import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";

export const useGetAllClasses = () => {
  const { data: result, ...query } = useQuery({
    queryKey: ["classes"],
    queryFn: () => AcademicAPI.getAllClasses(),
  });

  const data = result?.data ? result.data.data : undefined;
  return { data, ...query };
};
