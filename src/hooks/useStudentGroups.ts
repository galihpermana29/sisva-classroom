import AcademicAPI from "@/api/academic";
import type { StudentGroup } from "@/globalcomponents/BERespondTypes";
import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useStudentGroups = () => {
  return useQuery<StudentGroup[]>({
    queryKey: ["students-groups"],
    queryFn: async () => (await AcademicAPI.getAllStudentGroup()).data.data,
    placeholderData: [],
  });
};

export const useAddStudentToStudentGroup = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (payload: {
      studentGroupId: string;
      studentId: string;
    }) => {
      await AcademicAPI.insertStudentToStudentGroup(payload.studentGroupId, {
        student_id: payload.studentId,
      });
    },
    onSuccess: () => {
      // TODO invalidate studentInStudentGroups
      // queryClient.invalidateQueries({
      //   queryKey: [""],
      // });
    },
  });
};
