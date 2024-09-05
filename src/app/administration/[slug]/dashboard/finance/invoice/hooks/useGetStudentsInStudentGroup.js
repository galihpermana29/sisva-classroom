"use client";

import AcademicAPI from "@/api/academic";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentsInStudentGroup = (enabled = true) => {
  const { data, ...query } = useQuery({
    queryKey: ["students-in-student-group"],
    queryFn: () => AcademicAPI.getStudentsInStudentGroup(),
    enabled,
  });

  const result = data ? data.data.data : undefined;
  return { data: result, ...query };
};
