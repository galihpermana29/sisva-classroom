import AcademicAPI from "@/api/academic";
import type { NonLearningSchedules } from "@/globalcomponents/BERespondTypes";
import { useQuery } from "@tanstack/react-query";

export const useNonLearningSchedules = (period_id: string) => {
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
