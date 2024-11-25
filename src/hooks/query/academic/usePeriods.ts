import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";
import type { Period } from "@/types/apiTypes";

export const usePeriods = () => {
  return useQuery<Period[]>({
    queryKey: ["periods"],
    queryFn: async () => (await AcademicAPI.getAllPeriod()).data.data,
    placeholderData: [],
  });
};
