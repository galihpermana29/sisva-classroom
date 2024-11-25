"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";

export const useDeleteInvoice = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-invoice", { id }],
    mutationFn: () => FinanceAPI.deleteInvoice(id),
    onSettled: () => {
      queryClient.refetchQueries([
        "invoices",
        { user_id: undefined, bill_id: undefined },
      ]);
    },
  });
};
