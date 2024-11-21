"use client";

import FinanceAPI from "@/api/finance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
