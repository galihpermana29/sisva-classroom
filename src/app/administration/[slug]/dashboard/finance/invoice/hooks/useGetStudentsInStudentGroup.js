"use client";

import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";

export const useGetStudentsInStudentGroup = (enabled = true) => {
  const { data, ...query } = useQuery({
    queryKey: ["students-in-student-group"],
    queryFn: () => AcademicAPI.getStudentsInStudentGroup(),
    enabled,
  });

  const result = data ? data.data.data : undefined;
  return { data: result, ...query };
};
