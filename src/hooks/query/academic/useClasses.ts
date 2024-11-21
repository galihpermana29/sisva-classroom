import AcademicAPI from "@/api/academic";
import type { Class } from "@/types/apiTypes";
import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const useClasses = () => {
  return useQuery<Class[]>({
    queryKey: ["class"],
    queryFn: async () => (await AcademicAPI.getAllClasses()).data.data,
    placeholderData: [],
  });
};

export const invalidateClasses = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["class"] });
};
