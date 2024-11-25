import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";
import type { Extracurricular } from "@/types/apiTypes";

export const useExtracurriculars = () => {
  return useQuery<Extracurricular[]>({
    queryKey: ["extracurriculars"],
    queryFn: async () => (await AcademicAPI.getAllExtra()).data.data,
  });
};
