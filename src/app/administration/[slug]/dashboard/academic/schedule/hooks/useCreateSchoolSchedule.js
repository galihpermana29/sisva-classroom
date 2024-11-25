import { useMutation, useQueryClient } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";

export const useCreateSchoolSchedule = ({ handleClose, periode }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-school-schedule"],
    mutationFn: (payload) => AcademicAPI.createSchoolSchedule(payload),
    onSuccess: () => {
      handleClose ? handleClose() : undefined;
      queryClient.invalidateQueries([
        "school-schedule",
        { periode, shouldFetch: true },
      ]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
