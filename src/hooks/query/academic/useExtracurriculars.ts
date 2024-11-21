import AcademicAPI from "@/api/academic";
import type { Extracurricular } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";

export const useExtracurriculars = () => {
  return useQuery<Extracurricular[]>({
    queryKey: ["extracurriculars"],
    queryFn: async () => (await AcademicAPI.getAllExtra()).data.data,
  });
};
