"use client";

import { useGetStudentsInStudentGroup } from "./useGetStudentsInStudentGroup";

export const useGetStudentById = (id, enabled = true) => {
  const { data, ...query } = useGetStudentsInStudentGroup(enabled);
  const result = data
    ? data.find((student) => student.student_id === id)
    : undefined;

  return { data: result, ...query };
};
