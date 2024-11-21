import AcademicAPI from "@/api/academic";
import type { NonLearningSchedules } from "@/types/apiTypes";
import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const useNonLearningSchedules = (period_id: string | number) => {
  return useQuery<NonLearningSchedules[]>({
    queryKey: ["non-learning-schedules", period_id],
    queryFn: async () =>
      (
        await AcademicAPI.getAllNonLearningSchedules({
          period_id,
        })
      ).data.data,
    enabled: !!period_id,
    placeholderData: [],
  });
};

export const invalidateNonLearningSchedules = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: ["non-learning-schedules"],
  });
};
