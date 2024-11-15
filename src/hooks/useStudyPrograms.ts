import AcademicAPI from "@/api/academic";
import type { StudyProgram } from "@/globalcomponents/BERespondTypes";
import { useQuery } from "@tanstack/react-query";

export const useStudyPrograms = () => {
  return useQuery<StudyProgram[]>({
    queryKey: ["study-programs"],
    queryFn: async () => (await AcademicAPI.getAllProdi()).data.data,
    placeholderData: [],
  });
};
