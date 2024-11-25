import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";
import type { ClassSchedule } from "@/types/apiTypes";

export const useClassSchedules = (period_id: string | number) => {
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
