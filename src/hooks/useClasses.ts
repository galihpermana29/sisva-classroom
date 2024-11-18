import AcademicAPI from "@/api/academic";
import type { Class } from "@/globalcomponents/BERespondTypes";
import { useQuery } from "@tanstack/react-query";

export const useClasses = () => {
  return useQuery<Class[]>({
    queryKey: ["class"],
    queryFn: async () => (await AcademicAPI.getAllClasses()).data.data,
    placeholderData: [],
  });
};
