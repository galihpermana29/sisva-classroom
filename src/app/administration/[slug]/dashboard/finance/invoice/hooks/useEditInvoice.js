"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdatePayment } from "./useUpdatePayment";
import { FinanceAPI } from "@/api/finance";

export const useEditInvoice = ({ invoiceId, userBillId, handleClose }) => {
  const { mutate: updatePayment } = useUpdatePayment(invoiceId);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-invoice", { id: invoiceId }],
    mutationFn: (value) => {
      const paymentPayload = formatPaymentPayload(value);
      const invoicePayload = formatInvoicePayload(value, userBillId);
      updatePayment(paymentPayload);
      return FinanceAPI.updateInvoice(invoiceId, invoicePayload);
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["invoice", { id: invoiceId }] });
      handleClose ? handleClose() : undefined;
    },
  });
};

const formatPaymentPayload = (value) => ({
  note: value?.payment_proof_note,
  uri: value?.payment_proof_uri,
});

const formatInvoicePayload = (value, userBillId) => ({
  user_bill_id: userBillId,
  status: value?.status,
  note: value?.note,
});
