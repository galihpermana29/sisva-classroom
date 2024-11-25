"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";

export const useDeleteUserBill = ({ id, handleClose }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-user-bill", { id }],
    mutationFn: () => FinanceAPI.deleteUserBill(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "user-bill",
      });
      handleClose ? handleClose() : undefined;
    },
  });
};
