import AcademicAPI from "@/api/academic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSchoolSchedule = ({ handleClose }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-school-schedule"],
    mutationFn: (payload) => AcademicAPI.createSchoolSchedule(payload),
    onSuccess: () => {
      handleClose ? handleClose() : undefined;
      queryClient.invalidateQueries(["school-schedule", { shouldFetch: true }]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
