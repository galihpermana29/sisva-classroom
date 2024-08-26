"use client";

import { FinanceAPI } from "@/api/finance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateInvoice = ({ userBillId, handleClose }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-invoice"],
    mutationFn: (value) => {
      if (!userBillId) return;
      const payload = { ...value, user_bill_id: userBillId, status: "pending" };
      return FinanceAPI.createInvoice(payload);
    },
    onSuccess: () => {
      handleClose ? handleClose() : undefined;
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "invoice" || query.queryKey[0] === "invoices",
      });
    },
  });
};
