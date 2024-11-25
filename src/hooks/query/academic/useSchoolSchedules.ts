import { useQuery } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";
import type { SchoolSchedules } from "@/types/apiTypes";

export const useSchoolSchedules = (period_id: string | number) => {
  return useQuery<SchoolSchedules[]>({
    queryKey: ["school-schedules", period_id],
    queryFn: async () =>
      (
        await AcademicAPI.getAllSchoolSchedules({
          period_id,
        })
      ).data.data,
    enabled: !!period_id,
    placeholderData: [],
  });
};
