"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FinanceAPI } from "@/api/finance";

export const useEditInvoice = ({ invoiceId, userBillId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-invoice", { invoiceId, userBillId }],
    mutationFn: (value) => {
      const invoicePayload = formatInvoicePayload(value, userBillId);
      return FinanceAPI.updateInvoice(invoiceId, invoicePayload);
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["invoice", { id: invoiceId }] });
      queryClient.refetchQueries({
        queryKey: ["invoices", { bill_id: undefined, user_id: undefined }],
      });
    },
  });
};

const formatInvoicePayload = (value, userBillId) => ({
  user_bill_id: userBillId,
  status: value?.status,
  note: value?.note,
});
