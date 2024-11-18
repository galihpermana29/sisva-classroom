import AcademicAPI from "@/api/academic";
import type { SchoolSchedules } from "@/globalcomponents/BERespondTypes";
import { useQuery } from "@tanstack/react-query";

export const useSchoolSchedules = (period_id: string) => {
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
