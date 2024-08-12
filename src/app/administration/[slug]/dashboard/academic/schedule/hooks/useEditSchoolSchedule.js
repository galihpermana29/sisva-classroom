import AcademicAPI from "@/api/academic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditSchoolSchedule = ({ id, handleClose }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-school-schedule"],
    mutationFn: (payload) => AcademicAPI.editSchoolSchedule(payload, id),
    onSuccess: () => {
      handleClose ? handleClose() : undefined;
      queryClient.invalidateQueries(["school-schedule", { shouldFetch: true }]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
