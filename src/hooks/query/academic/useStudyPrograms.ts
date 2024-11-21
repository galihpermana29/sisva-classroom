import AcademicAPI from "@/api/academic";
import type { StudyProgram } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";

export const useStudyPrograms = () => {
  return useQuery<StudyProgram[]>({
    queryKey: ["study-programs"],
    queryFn: async () => (await AcademicAPI.getAllProdi()).data.data,
    placeholderData: [],
  });
};
