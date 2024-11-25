"use client";

import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";

export const useGetAllStudentGroups = () => {
  const { data: result, ...query } = useQuery({
    queryKey: ["student-groups"],
    queryFn: () => AcademicAPI.getAllStudentGroup(),
  });

  const data = result?.data ? result.data.data : undefined;
  return { data, ...query };
};
