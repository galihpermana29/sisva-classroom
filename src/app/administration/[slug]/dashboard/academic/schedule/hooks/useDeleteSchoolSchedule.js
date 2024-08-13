import AcademicAPI from "@/api/academic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSchoolSchedule = ({ id, handleClose, periode }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-school-schedule"],
    mutationFn: () => AcademicAPI.deleteSchoolSchedule(id),
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
