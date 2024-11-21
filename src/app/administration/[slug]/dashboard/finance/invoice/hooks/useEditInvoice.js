"use client";

import FinanceAPI from "@/api/finance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditInvoice = ({ invoiceId, userBillId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-invoice", { invoiceId, userBillId }],
    mutationFn: (value) => {
      const invoicePayload = formatInvoicePayload(value, userBillId);
      return FinanceAPI.updateInvoice(invoiceId, invoicePayload);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "invoice" || query.queryKey[0] === "invoices",
      });
    },
  });
};

const formatInvoicePayload = (value, userBillId) => ({
  user_bill_id: userBillId,
  status: value?.status,
  note: value?.note,
});
