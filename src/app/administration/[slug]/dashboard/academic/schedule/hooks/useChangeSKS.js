"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import AcademicAPI from "@/api/academic";

export const useChangeSKS = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["change-sks"],
    mutationFn: (payload) => AcademicAPI.createCredit(payload),
    onSuccess: () => queryClient.invalidateQueries(["get-sks"]),
  });
};
