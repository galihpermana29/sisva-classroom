import AcademicAPI from "@/api/academic";
import type { Period } from "@/globalcomponents/BERespondTypes";
import { useQuery } from "@tanstack/react-query";

export const usePeriods = () => {
  return useQuery<Period[]>({
    queryKey: ["periods"],
    queryFn: async () => (await AcademicAPI.getAllPeriod()).data.data,
    placeholderData: [],
  });
};
