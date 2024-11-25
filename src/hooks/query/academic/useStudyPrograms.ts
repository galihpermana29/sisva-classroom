import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";
import type { StudyProgram } from "@/types/apiTypes";

export const useStudyPrograms = () => {
  return useQuery<StudyProgram[]>({
    queryKey: ["study-programs"],
    queryFn: async () => (await AcademicAPI.getAllProdi()).data.data,
    placeholderData: [],
  });
};
