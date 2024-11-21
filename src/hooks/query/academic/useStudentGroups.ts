import AcademicAPI from "@/api/academic";
import type { StudentGroup, StudentInStudentGroup } from "@/types/apiTypes";
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
    mutationFn: async ({
      studentGroupId,
      studentId,
    }: {
      studentGroupId: number | number;
      studentId: string;
    }) => {
      await AcademicAPI.insertStudentToStudentGroup(studentGroupId, {
        student_id: studentId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-in-student-groups"],
      });
    },
    onError: (error) => console.log(error),
  });
};

export const useStudentInStudentGroups = () => {
  return useQuery<StudentInStudentGroup[]>({
    queryKey: ["student-in-student-groups"],
    queryFn: async () =>
      (await AcademicAPI.getStudentsInStudentGroup()).data.data,
    placeholderData: [],
  });
};

export const useUpdateStudentInStudentGroup = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({
      oldStudentGroupId,
      newStudentGroupId,
      oldStudentId,
      studentId,
    }: {
      oldStudentGroupId: number | string;
      newStudentGroupId: number | string;
      oldStudentId: string;
      studentId: string;
    }) => {
      await AcademicAPI.removeStudentFromGroup(oldStudentGroupId, {
        student_id: oldStudentId,
      });
      await AcademicAPI.insertStudentToStudentGroup(newStudentGroupId, {
        student_id: studentId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-in-student-groups"],
      });
    },
    onError: (error) => console.log(error),
  });
};
