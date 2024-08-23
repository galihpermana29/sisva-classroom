"use client";

import AcademicAPI from "@/api/academic";
import { useQuery } from "@tanstack/react-query";

export const useGetAllStudentGroups = () => {
  const { data: result, ...query } = useQuery({
    queryKey: ["student-groups"],
    queryFn: () => AcademicAPI.getAllStudentGroup(),
  });

  const data = result?.data ? result.data.data : undefined;
  return { data, ...query };
};
