import AcademicAPI from "@/api/academic";
import type { SubjectTeacher } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";

export const useSubjectTeachers = () => {
  return useQuery<SubjectTeacher[]>({
    queryKey: ["subjectTeachers"],
    queryFn: async () => (await AcademicAPI.getAllSubjectTeacher()).data.data,
  });
};
