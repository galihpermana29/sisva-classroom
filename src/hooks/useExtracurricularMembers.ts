import AcademicAPI from "@/api/academic";
import type { ExtracurricularMember } from "@/types/BERespondTypes";
import { useQuery } from "@tanstack/react-query";

export const useExtracurricularMembers = () => {
  return useQuery<ExtracurricularMember[]>({
    queryKey: ["extracurricular-members"],
    queryFn: async () => (await AcademicAPI.getAllExtraStudent()).data.data,
  });
};
