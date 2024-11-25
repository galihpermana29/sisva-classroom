"use client";

import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";

export const useGetAllStudyPrograms = (param) => {
  const { data: queryResult, ...query } = useQuery({
    queryKey: ["study-programs"],
    queryFn: () => AcademicAPI.getAllProdi(),
    enabled: param?.enabled === false ? false : true,
  });

  const result = queryResult ? queryResult.data.data : undefined;
  return { data: result, ...query };
};
