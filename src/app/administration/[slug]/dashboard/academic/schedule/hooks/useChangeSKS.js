"use client";

import AcademicAPI from "@/api/academic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangeSKS = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["change-sks"],
    mutationFn: (payload) => AcademicAPI.createCredit(payload),
    onSuccess: () => queryClient.invalidateQueries(["get-sks"]),
  });
};
