import AcademicAPI from "@/api/academic";
import type { ClassSchedule } from "@/globalcomponents/BERespondTypes";
import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const useClassSchedules = (period_id: string) => {
  return useQuery<ClassSchedule[]>({
    queryKey: ["class-schedules", period_id],
    queryFn: async () =>
      (
        await AcademicAPI.getAllClassSchedules({
          period_id,
        })
      ).data.data,
    enabled: !!period_id,
    placeholderData: [],
  });
};

export const invalidateClassSchedules = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: ["class-schedules"],
  });
};
